/* Deterministic INR pricing and local XLSX/CSV import. No network requests. */
((root) => {
  'use strict';
  const UNITS=['package','event','person','item','day','hour','room','vehicle','trip','set','table','chair','sq ft'];
  const clean=v=>String(v??'').trim();
  function numeric(value,{blank=false,max=1000000,places=3,min=0}={}) {
    const s=clean(value).replace(/[₹,\s]/g,'');
    if(!s&&blank)return null;
    if(!s||!new RegExp(`^\\d+(?:\\.\\d{1,${places}})?$`).test(s))throw new Error('Enter a valid non-negative number.');
    const n=Number(s);if(!Number.isFinite(n)||n<min||n>max)throw new Error(`Number must be between ${min} and ${max}.`);
    return n;
  }
  const money=(v,blank=false)=>{const n=numeric(v,{blank,max:10000000,places:2});return n===null?null:Math.round(n*100);};
  function csv(text) {
    const rows=[];let row=[],cell='',quoted=false,afterQuote=false;
    text=text.replace(/^\uFEFF/,'');
    for(let p=0;p<text.length;p++) {
      const c=text[p];
      if(quoted){if(c==='"'){if(text[p+1]==='"'){cell+='"';p++;}else{quoted=false;afterQuote=true;}}else cell+=c;}
      else if(c==='"'&&!cell&&!afterQuote)quoted=true;
      else if(c===','||c==='\n'||c==='\r'){
        row.push(cell);cell='';afterQuote=false;
        if(c!==','){if(c==='\r'&&text[p+1]==='\n')p++;if(row.some(v=>v.trim()))rows.push(row);row=[];}
      }else {if(afterQuote&&!/\s/.test(c))throw new Error('Invalid CSV quotation.');cell+=c;}
      if(cell.length>10000||rows.length>5000)throw new Error('The rates file is too large.');
    }
    if(quoted)throw new Error('Unclosed CSV quotation.');
    row.push(cell);if(row.some(v=>v.trim()))rows.push(row);return rows;
  }
  function validateRates(rates,items) {
    const ids=new Set(items.map(i=>i.id));
    for(const [id,r] of Object.entries(rates)) {
      if(!ids.has(id)||!r||!UNITS.includes(r.unit))throw new Error('Unknown item or pricing unit.');
      if(r.cents!==null&&(!Number.isSafeInteger(r.cents)||r.cents<0||r.cents>1000000000))throw new Error('Invalid ceiling rate.');
      if(r.includedIn&&(!ids.has(r.includedIn)||r.includedIn===id||!(r.includedQty>0&&r.includedQty<=1000000)))throw new Error('Check the package inclusion reference and quantity.');
      let current=id;const seen=new Set();
      while(rates[current]?.includedIn){if(seen.has(current))throw new Error('Package inclusions contain a circular reference.');seen.add(current);current=rates[current].includedIn;}
    }
    return rates;
  }
  function fromRows(rows,items) {
    if(rows.length<2)throw new Error('No rate rows found. Use the Rates sheet in the template.');
    const h=rows[0].map(v=>clean(v).toLowerCase());
    const col=name=>h.indexOf(name.toLowerCase());
    const c={id:col('Item ID'),ref:col('Ref'),unit:col('Rate unit'),rate:col('Ceiling rate INR'),scope:col('Scope / inclusions'),parent:col('Included under ref'),qty:col('Units covered per parent')};
    if(c.rate<0||c.unit<0||(c.id<0&&c.ref<0))throw new Error('Keep the template headings: Item ID or Ref, Rate unit, Ceiling rate INR.');
    const ids=new Map(items.map(i=>[i.id,i]));const refs=new Map(items.map(i=>[i.ref.toUpperCase(),i.id]));const result={};
    rows.slice(1).forEach((row,index)=>{
      if(!row.some(v=>clean(v)))return;
      const id=clean(row[c.id])||refs.get(clean(row[c.ref]).toUpperCase());
      if(!ids.has(id))throw new Error(`Row ${index+2}: unknown item identifier.`);
      if(Object.hasOwn(result,id))throw new Error(`Row ${index+2}: duplicate item ${ids.get(id).ref}.`);
      const unit=clean(row[c.unit]).toLowerCase()||'package';
      if(!UNITS.includes(unit))throw new Error(`Row ${index+2}: choose a unit from the template list.`);
      let cents,covered=null;try{cents=money(row[c.rate],true);}catch(e){throw new Error(`Row ${index+2}: ${e.message}`);}
      const parentRef=clean(row[c.parent]).toUpperCase();let parent='';
      if(parentRef){parent=refs.get(parentRef);if(!parent)throw new Error(`Row ${index+2}: unknown included-under reference.`);covered=numeric(row[c.qty],{min:.001});}
      else if(clean(row[c.qty]))throw new Error(`Row ${index+2}: specify the parent reference for covered units.`);
      result[id]={cents,unit,scope:clean(row[c.scope]).slice(0,1500),includedIn:parent,includedQty:covered};
    });
    validateRates(result,items);
    return {rates:result,priced:Object.values(result).filter(r=>r.cents!==null).length,inclusions:Object.values(result).filter(r=>r.includedIn).length,rows:Object.keys(result).length};
  }
  async function xlsx(buffer) {
    if(buffer.byteLength>8000000)throw new Error('Use an Excel file smaller than 8 MB.');
    const d=new DataView(buffer),b=new Uint8Array(buffer),decoder=new TextDecoder();let e=-1;
    for(let p=b.length-22;p>=Math.max(0,b.length-65557);p--)if(d.getUint32(p,true)===0x06054b50){e=p;break;}
    if(e<0)throw new Error('This is not a supported XLSX file. Save as .xlsx or CSV.');
    const count=d.getUint16(e+10,true);let p=d.getUint32(e+16,true);const entries=new Map();
    if(count>1000)throw new Error('Workbook has too many entries.');
    for(let n=0;n<count;n++){
      if(p+46>b.length||d.getUint32(p,true)!==0x02014b50)throw new Error('Damaged Excel archive.');
      const flags=d.getUint16(p+8,true),method=d.getUint16(p+10,true),size=d.getUint32(p+20,true),unpacked=d.getUint32(p+24,true),nl=d.getUint16(p+28,true),el=d.getUint16(p+30,true),cl=d.getUint16(p+32,true),offset=d.getUint32(p+42,true);
      if(flags&1||unpacked>8000000||size>8000000||p+46+nl+el+cl>b.length)throw new Error('Unsupported or oversized workbook entry.');
      const name=decoder.decode(b.slice(p+46,p+46+nl));entries.set(name,{method,size,offset});p+=46+nl+el+cl;
    }
    async function read(name,optional=false){
      const v=entries.get(name);if(!v){if(optional)return '';throw new Error(`Missing Excel component: ${name}`);}
      const o=v.offset;if(o+30>b.length||d.getUint32(o,true)!==0x04034b50)throw new Error('Damaged Excel entry.');
      const start=o+30+d.getUint16(o+26,true)+d.getUint16(o+28,true);if(start+v.size>b.length)throw new Error('Truncated workbook.');
      const bytes=b.slice(start,start+v.size);let decoded;
      if(v.method===0)decoded=bytes;
      else if(v.method===8){
        if(typeof DecompressionStream==='undefined')throw new Error('This browser needs the CSV version of the Rates sheet.');
        const reader=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();const chunks=[];let length=0;
        while(true){const {value,done}=await reader.read();if(done)break;length+=value.length;if(length>8000000){await reader.cancel();throw new Error('Workbook expands beyond the size limit.');}chunks.push(value);}
        decoded=new Uint8Array(length);let at=0;for(const chunk of chunks){decoded.set(chunk,at);at+=chunk.length;}
      }else throw new Error('Unsupported workbook compression. Save as XLSX or CSV.');
      return decoder.decode(decoded);
    }
    const xml=s=>{if(/<!DOCTYPE|<!ENTITY/i.test(s))throw new Error('Unsupported XML declaration.');const x=new DOMParser().parseFromString(s,'application/xml');if(x.getElementsByTagName('parsererror').length)throw new Error('Invalid workbook XML.');return x;};
    const book=xml(await read('xl/workbook.xml'));const sheet=[...book.getElementsByTagName('sheet')].find(s=>s.getAttribute('name')==='Rates');
    if(!sheet)throw new Error('The workbook must contain the Rates sheet.');
    const rels=xml(await read('xl/_rels/workbook.xml.rels'));const rid=sheet.getAttribute('r:id');const rel=[...rels.getElementsByTagName('Relationship')].find(r=>r.getAttribute('Id')===rid);
    if(!rel||rel.getAttribute('TargetMode')==='External')throw new Error('Unsupported Rates sheet relationship.');
    let path=rel.getAttribute('Target');path=path.startsWith('/')?path.slice(1):'xl/'+path;
    if(path.includes('..'))throw new Error('Unsupported worksheet path.');
    const sharedText=await read('xl/sharedStrings.xml',true);const strings=sharedText?[...xml(sharedText).getElementsByTagName('si')].map(si=>[...si.getElementsByTagName('t')].map(t=>t.textContent).join('')):[];
    const doc=xml(await read(path));const rows=[];
    for(const row of doc.getElementsByTagName('row')){
      if(rows.length>5000)throw new Error('Too many worksheet rows.');const values=[];
      for(const c of row.getElementsByTagName('c')){
        const address=c.getAttribute('r')||'';const letters=address.match(/^[A-Z]+/)?.[0];if(!letters)continue;let column=0;for(const letter of letters)column=column*26+letter.charCodeAt(0)-64;
        if(column>100)continue;
        if(c.getElementsByTagName('f').length)throw new Error('Enter fixed values in the Rates sheet, not formulas.');
        const raw=c.getElementsByTagName('v')[0]?.textContent??'';const type=c.getAttribute('t');
        values[column-1]=type==='s'?(strings[Number(raw)]??''):type==='inlineStr'?[...c.getElementsByTagName('t')].map(t=>t.textContent).join(''):raw;
      }
      if(values.some(v=>clean(v)))rows.push(Array.from({length:Math.max(10,values.length)},(_,i)=>values[i]??''));
    }
    return rows;
  }
  async function importFile(file,items){
    if(file.size>8000000)throw new Error('Use a file smaller than 8 MB.');
    const rows=/\.xlsx$/i.test(file.name)?await xlsx(await file.arrayBuffer()):/\.csv$/i.test(file.name)?csv(await file.text()):null;
    if(!rows)throw new Error('Choose the completed XLSX workbook or a CSV of its Rates sheet.');
    return {...fromRows(rows,items),filename:file.name.slice(0,200)};
  }
  function calculate(items,selected,pricing={},unplaced=0) {
    const rates=pricing.rates||{};const lookup=new Map(items.map(i=>[i.id,i]));const problems=[];const rows=[];let base=0,lineDiscount=0,missing=0;
    for(const [id,choice] of Object.entries(selected)){
      if(!choice.selected||!lookup.has(id))continue;
      const rate=rates[id]||{cents:null,unit:'package',scope:''};let qty=0,covered=0,discount=0,error='';
      try{qty=numeric(choice.quantity??'1',{min:.001});}catch(_){error='quantity';}
      if(rate.includedIn&&selected[rate.includedIn]?.selected){
        try{const parentQty=numeric(selected[rate.includedIn].quantity??'1',{min:.001});covered=Math.min(qty,parentQty*rate.includedQty);}catch(_){error='parent quantity';}
      }
      const billable=Math.max(0,Math.round((qty-covered)*1000)/1000);
      const amount=error?null:billable===0?0:rate.cents===null||rate.cents===undefined?null:Math.round(rate.cents*billable);
      if(amount!==null&&!Number.isSafeInteger(amount))error='amount too large';
      try{discount=money(choice.discount||'0');if(discount>(amount??0))throw new Error();}catch(_){error=error||'line discount';discount=0;}
      if(amount===null)missing++;
      if(error)problems.push({id,error});
      const row={id,item:lookup.get(id),qty,covered,billable,unit:rate.unit,scope:rate.scope||'',parent:rate.includedIn||'',unitCents:rate.cents??null,base:amount,discount,net:amount===null?null:amount-discount,error};
      rows.push(row);if(amount!==null){base+=amount;lineDiscount+=discount;}
    }
    let extra=0,taxPercent=0,packageDiscount=0;const net=base-lineDiscount;
    try{extra=money(pricing.extra||'0');}catch(_){problems.push({error:'additional charges'});}
    try{taxPercent=numeric(pricing.tax||'0',{max:100,places:2});}catch(_){problems.push({error:'tax percentage'});}
    try{
      packageDiscount=pricing.discountMode==='percent'?Math.round(net*numeric(pricing.discount||'0',{max:100,places:2})/100):money(pricing.discount||'0');
      if(packageDiscount>net)throw new Error();
    }catch(_){problems.push({error:'package discount'});packageDiscount=0;}
    const beforeTax=net-packageDiscount+extra;const tax=Math.round(beforeTax*taxPercent/100);const total=beforeTax+tax;
    if(!Number.isSafeInteger(total))problems.push({error:'total too large'});
    return {rows,base,lineDiscount,packageDiscount,extra,tax,taxPercent,total,savings:lineDiscount+packageDiscount,missing,unplaced,problems,complete:rows.length>0&&missing===0&&unplaced===0&&problems.length===0,sections:new Set(rows.map(r=>r.item.sectionId)).size};
  }
  const api={UNITS,numeric,money,csv,xlsx,fromRows,validateRates,importFile,calculate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.JVPrice=api;
})(typeof window==='undefined'?globalThis:window);
