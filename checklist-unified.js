/* Client checklist: selections and notes only. */
(() => {
  'use strict';
  const DATA=window.JV_CHECKLIST;
  const ITEMS=DATA.sections.flatMap(s=>s.groups.flatMap(g=>g.items.map(i=>({...i,sectionId:s.id,sectionTitle:s.title}))));
  const MAP=new Map(ITEMS.map(i=>[i.id,i]));
  const KEY='jvardhan-client-checklist-v4', PREVIOUS_KEY='jvardhan-unified-checklist-v3';
  const OLD=[[PREVIOUS_KEY,'Previous complete checklist','અગાઉની સંપૂર્ણ યાદી'],['jvardhan-event-checklist-v1','Event checklist','પ્રસંગવાર યાદી'],['jvardhan-wedding-checklist-v1','Master checklist','માસ્ટર યાદી']];
  const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const COPY={
    backSite:['વેબસાઇટ પર પાછા','Back to website'],
    eyebrow:['તમારા પ્રસંગનું સંપૂર્ણ આયોજન','YOUR COMPLETE WEDDING CHECKLIST'],
    headline:['બધી વિગતો. એક સુંદર આયોજન.','Every detail. One beautiful plan.'],
    heroText:["૨૦૦ વસ્તુઓ, પ્રસંગ પ્રમાણે ગોઠવેલી. પસંદ કરો, નોંધ લખો અને તમારા આયોજનનો સારાંશ શેર કરો.", "200 items, organised around your celebration. Choose what you need, add notes and share your plan."],
    heroFoot:['૧૧ વિભાગો · ૨૦૦ વસ્તુઓ · એક યાદી','11 SECTIONS · 200 ITEMS · ONE CHECKLIST'],
    masterCount:['૨૦૦ વસ્તુઓ · ૧૧ વિભાગો','200 ITEMS · 11 SECTIONS'],
    photoCaption:['તમારી પસંદગી, તમારી ઉજવણી','Your choices, your celebration'],
    yourCelebration:['આયોજનના વિભાગો','PLANNING SECTIONS'],
    review:["પસંદગીની સમીક્ષા", "Review your choices"],
    chooseCategory:['વિભાગ પસંદ કરો','Choose a section'],
    searchLabel:['બધી ૨૦૦ વસ્તુઓમાં શોધો','Search all 200 items'],
    selectedOnly:['પસંદ કરેલી','Selected'],
    searchPlaceholder:['ફૂલો, હોટેલ, ડીજે…','Flowers, hotel, DJ…'],
    clearFilters:['ફિલ્ટર દૂર કરો','Clear filters'],
    results:['પરિણામો','results'],
    selected:['પસંદ કરેલી વસ્તુઓ','selected items'],
    saved:['આ ઉપકરણમાં સાચવ્યું','Saved on this device'],
    saveFailed:['સાચવી શકાયું નથી. ડ્રાફ્ટ ડાઉનલોડ કરો.','Could not save. Download your draft.'],
    localNotice:["તમારી પસંદગી આ બ્રાઉઝરમાં રહે છે. આયોજક સાથે સારાંશ શેર કરો.", "Your selections stay in this browser. Share the summary with your planner."],
    clientDetails:['ક્લાયન્ટ અને પ્રસંગની વિગતો','Client & celebration details'],
    optional:['વૈકલ્પિક','Optional'],
    clientName:['ક્લાયન્ટ / પરિવાર','Client / family'],
    couple:['વર-વધૂનાં નામ','Bride & groom'],
    date:['તારીખ','Date'],
    time:['સમય','Time'],
    location:['સ્થળ / શહેર','Venue / city'],
    phone:['મોબાઇલ','Phone'],
    contact:['સંપર્ક વ્યક્તિ','Contact person'],
    guests:['મહેમાનો','Guests'],
    overallBudget:['કુલ બજેટ (₹)','Overall budget (₹)'],
    preferences:['થીમ અને ખાસ પસંદગી','Theme & preferences'],
    vendors:['વેન્ડરના સંપર્કો','Vendor contacts'],
    notes:['નોંધ','Notes'],
    shortNote:['ટૂંકી નોંધ (વૈકલ્પિક)','Short note (optional)'],
    noteHint:['સંખ્યા, રંગ, સમય કે ખાસ પસંદગી…','Quantity, colour, timing or a preference…'],
    confirmDetail:['વિગત નક્કી કરો','Detail to confirm'],
    sectionDetails:['આ પ્રસંગની તારીખ, સ્થળ અને નોંધ','Dates, venue & notes for this section'],
    includeSection:["આયોજનમાં આ વિભાગ સામેલ કરો", "Include this section in your plan"],
    excluded:["આ વિભાગ સારાંશમાં સામેલ નથી. પસંદગી સચવાયેલી છે.", "This section is excluded from the summary. Its selections are retained."],
    none:['કોઈ વસ્તુ મળી નથી.','No items found.'],
    back:['પાછળ','Back'],
    next:['આગળ','Next'],
    backList:['યાદીમાં પાછા જાઓ','Back to checklist'],
    footer:['સાથે મળીને, સુંદર આયોજન.','Thoughtfully planned. Together.'],
    portfolio:['અમારું કામ જુઓ','Explore our work'],
    draftTools:['ડ્રાફ્ટ સાચવો / ખોલો','Drafts & backup'],
    saveDraft:["સંપાદનયોગ્ય ડ્રાફ્ટ ડાઉનલોડ કરો", "Back up editable draft"],
    openDraft:['ડ્રાફ્ટ ખોલો','Open saved draft'],
    newClient:['નવો ક્લાયન્ટ','New client'],
    resetConfirm:["હાલનો ક્લાયન્ટ ડ્રાફ્ટ સાફ કરવો છે? પહેલાં જરૂર હોય તો ડ્રાફ્ટ ડાઉનલોડ કરો.", "Clear the current client draft? Download a backup first if needed."],
    replaceConfirm:['આ ફાઇલથી હાલનો ક્લાયન્ટ ડ્રાફ્ટ બદલવો છે?','Replace the current client draft with this file?'],
    pdfEn:['અંગ્રેજી A4 ચેકલિસ્ટ','English A4 checklist'],
    pdfGu:['ગુજરાતી A4 ચેકલિસ્ટ','Gujarati A4 checklist'],
    cancel:['રદ કરો','Cancel'],
    olderDrafts:['અગાઉના સાચવેલા ડ્રાફ્ટ','Previous saved checklists'],
    olderNotice:['અગાઉની યાદીઓ સચવાયેલી છે. નીચેમાંથી એક ડ્રાફ્ટ ખોલો; બે ક્લાયન્ટની વિગતો આપમેળે ભળશે નહીં.','Earlier checklists are available below. Open one saved draft to continue it.'],
    open:['ખોલો','Open'],
    placeTitle:['અગાઉની સેવાઓને યોગ્ય પ્રસંગમાં મૂકો','Place earlier services in the right event'],
    placeHelp:["અગાઉની માંગ માટે લાગુ પડતી વસ્તુઓ પસંદ કરો.", "Choose the relevant checklist items for these earlier requests."],
    place:['પસંદ કરેલી જગ્યાએ ઉમેરો','Add to selected items'],
    omit:['હાલ જરૂરી નથી','Not needed now'],
    priorServices:['અગાઉ નોંધેલી સામાન્ય સેવાઓ','Earlier general service requests'],
    quantity:['સંખ્યા','Quantity'],
    noSelection:["જરૂરી વસ્તુઓ પસંદ કરો અથવા પ્રસંગની વિગતો ઉમેરો.", "Choose some services or add your event details."],
    print:['પ્રિન્ટ / PDF','Print / save PDF'],
    download:['સારાંશ ડાઉનલોડ','Download summary'],
    share:['સારાંશ શેર કરો','Share summary'],
    downloaded:['ડાઉનલોડ તૈયાર છે.','Download ready.'],
    invalidFile:['ફાઇલ ખોલી શકાઈ નથી.','Could not open the file.'],
    selectedSections:['વિભાગોમાંથી પસંદગી','sections represented'],
    sectionNotes:['વિભાગની નોંધ','Section notes'],
    restore:['જૂનો ડ્રાફ્ટ પુનઃખોલો','Restore previous draft'],
    selectPlacement:['ઓછામાં ઓછી એક વસ્તુ પસંદ કરો.','Choose at least one matching item.'],
    extraRequests:['વધારાની માંગ / અગાઉની નોંધ','Additional requests / earlier notes'],
    kept:['અગાઉની માહિતી ડ્રાફ્ટમાં સચવાઈ છે.','Earlier information is preserved in the draft.'],
    downloads:["ચેકલિસ્ટ PDF", "Checklist PDFs"],
    briefTitle:["તમારા પ્રસંગનો સારાંશ", "Your celebration brief"],
    briefHelp:["પસંદગી અને નોંધ તપાસો, પછી આયોજક સાથે શેર કરો.", "Review your selections and notes, then share them with your planner."],
    briefEyebrow:["સાથે મળીને આયોજન કરીએ", "READY TO PLAN TOGETHER"],
    noItems:["વસ્તુઓની પસંદગી હજી બાકી છે.", "Individual items are still to be chosen."]
  };
  Object.assign(COPY,{
    decor:['સજાવટ અને ફૂલો','Decor & flowers'],stage:['સ્ટેજ અને બેઠક','Stage & seating'],sound:['લાઇટ અને સાઉન્ડ','Lighting & sound'],photo:['ફોટો અને વીડિયો','Photo & video'],food:['જમવાની વ્યવસ્થા','Food & catering'],guestHelp:['મહેમાનોની વ્યવસ્થા','Guest hospitality'],entertainment:['સંગીત અને મનોરંજન','Music & entertainment'],rituals:['વિધિની વ્યવસ્થા','Ritual arrangements'],
    previousHelp:['આ સામાન્ય માંગ માટે યાદીમાં યોગ્ય વસ્તુઓ પસંદ કરો, પછી નીચે નક્કી કરો.','Select the relevant checklist items for these earlier requests, then confirm below.'],previousDone:['આ માંગ યાદીમાં ઉમેરી દીધી છે','I have added these requests to the checklist']
  });
  const CLIENT=['clientName','couple','date','location','phone','contact','guests','overallBudget','preferences','vendors'];
  const META=['date','time','location','guests','notes'];
  let storageOK=true,active=0,reviewing=false,search='',onlySelected=false,toastTimer;
  function read(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch(_){storageOK=false;return null;}}
  function write(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true;}catch(_){storageOK=false;return false;}}
  const str=(v,max=6000)=>typeof v==='string'?v.slice(0,max):typeof v==='number'?String(v):'';
  const fresh=()=>({version:4,source:DATA.source,lang:'gu',client:{},sections:{},items:{},pending:[],previousServices:[],previousHandled:false});
  function appendNote(old,addition){return [...new Set([str(old),str(addition)].filter(Boolean))].join('\n').slice(0,6000);}
  function oldNote(v){return [v.quantity?`Quantity / સંખ્યા: ${str(v.quantity,80)}`:'',v.owner&&v.owner!=='tbd'?`Responsible / જવાબદારી: ${str(v.owner,80)}`:'',v.status&&v.status!=='discuss'?`Status / સ્થિતિ: ${str(v.status,80)}`:'',str(v.notes)].filter(Boolean).join('\n');}
  function normalize(raw){
    if(!raw||![1,2,3,4].includes(raw.version)||!raw.items||typeof raw.items!=='object'||!raw.sections||typeof raw.sections!=='object')throw new Error('Invalid checklist draft.');
    const v=fresh();v.lang=raw.lang==='en'?'en':'gu';
    CLIENT.forEach(k=>v.client[k]=str(raw.client?.[k]));
    if(!v.client.location)v.client.location=str(raw.client?.city);
    const restore=source=>{
      for(const s of DATA.sections){const old=source.sections?.[s.id];if(!old)continue;v.sections[s.id]={inclusion:old.inclusion==='skip'?'skip':'include'};META.forEach(k=>v.sections[s.id][k]=str(old[k]));}
      for(const id of MAP.keys()){const old=source.items?.[id];if(!old||typeof old!=='object')continue;v.items[id]={selected:old.selected===true,notes:raw.version===4?str(old.notes):raw.version===3?appendNote(str(old.notes),old.quantity&&String(old.quantity)!=='1'?`Quantity / સંખ્યા: ${str(old.quantity,80)}`:''):oldNote(old)};}
    };
    if(raw.version>=3){
      restore(raw);v.previousHandled=raw.previousHandled===true;
      v.previousServices=Array.isArray(raw.previousServices)?raw.previousServices.map(x=>str(x,300)).slice(0,30):[];
      v.pending=Array.isArray(raw.pending)?raw.pending.filter(x=>DATA.masterMapping[x.sourceId]).map(x=>({sourceId:x.sourceId,notes:str(x.notes),selected:x.selected===true})):[];
    }else{
      restore(raw.version===1?raw:raw.legacy||{});v.previousHandled=true;
      v.previousServices=Array.isArray(raw.services)?raw.services.map(x=>str(x,100)).slice(0,30):[];
      if(raw.version===2)for(const [sourceId,m] of Object.entries(DATA.masterMapping)){
        const old=raw.items[sourceId];if(!old||(!old.selected&&!old.notes))continue;
        if(m.targets.length===1){const id=m.targets[0];v.items[id]={...(v.items[id]||{}),selected:!!(old.selected||v.items[id]?.selected),notes:appendNote(v.items[id]?.notes,oldNote(old))};}
        else v.pending.push({sourceId,notes:oldNote(old),selected:old.selected===true});
      }
    }
    return v;
  }
  let state=fresh();try{const saved=read(KEY),previous=saved?null:read(PREVIOUS_KEY);if(saved||previous){state=normalize(saved||previous);if(previous)write(KEY,state);}}catch(_){storageOK=false;}
  const queryLang=new URLSearchParams(location.search).get('lang');if(['gu','en'].includes(queryLang))state.lang=queryLang;
  const t=k=>COPY[k]?.[state.lang==='gu'?0:1]??k, tr=x=>x?.[state.lang]??'';
  const enabled=id=>state.sections[id]?.inclusion!=='skip';
  const selected=()=>Object.fromEntries(Object.entries(state.items).filter(([id,v])=>v.selected&&MAP.has(id)&&enabled(MAP.get(id).sectionId)));
  function save(){const ok=write(KEY,state);$('#save-status').textContent=t(ok?'saved':'saveFailed');}
  function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,7000);}
  function inputField(key,value,attrs,type='text'){return `<label class="field">${esc(t(key))}${type==='textarea'?`<textarea ${attrs} maxlength="6000">${esc(value)}</textarea>`:`<input ${attrs} type="${type}" value="${esc(value)}" ${type==='number'?'min="0" step="any"':''}>`}</label>`;}
  function renderClient(){$('#client-fields').innerHTML=CLIENT.map(k=>inputField(k,state.client[k]||'',`data-client="${k}"`,['preferences','vendors'].includes(k)?'textarea':k==='date'?'date':k==='phone'?'tel':['guests','overallBudget'].includes(k)?'number':'text')).join('');}
  function renderNav(){
    $('#section-nav').innerHTML=DATA.sections.map((s,n)=>`<button type="button" class="section-link" data-step="${n}" ${!reviewing&&active===n?'aria-current="step"':''}><span>${esc(tr(s.title))}</span><small>${s.groups.flatMap(g=>g.items).filter(i=>state.items[i.id]?.selected&&enabled(s.id)).length}</small></button>`).join('');
    $('#category-select').innerHTML=DATA.sections.map((s,n)=>`<option value="${n}" ${n===active?'selected':''}>${esc(tr(s.title))}</option>`).join('');
    const count=Object.keys(selected()).length;$('#total-counter').textContent=count;$('#filter-count').textContent=count;
    $('#selected-filter').setAttribute('aria-pressed',String(onlySelected));
  }
  function itemHTML(i){const v=state.items[i.id]||{};return `<article class="item${v.selected?' selected':''}"><label class="item-choice" for="check-${i.id}"><input type="checkbox" id="check-${i.id}" data-select="${i.id}" ${v.selected?'checked':''}><small class="service-number">${i.ref}</small><span>${esc(tr(i.label))}</span></label>${i.note?`<details class="item-note"><summary>${esc(t('confirmDetail'))}</summary><p>${esc(tr(i.note))}</p></details>`:''}${v.selected?`<div class="item-controls"><label class="field" for="notes-${i.id}">${esc(t('shortNote'))}<textarea id="notes-${i.id}" data-note="${i.id}" maxlength="6000" placeholder="${esc(t('noteHint'))}">${esc(v.notes)}</textarea></label></div>`:''}</article>`;}
  function matched(i,s){return (!onlySelected||state.items[i.id]?.selected&&enabled(s.id))&&(!search||[i.ref,i.label.en,i.label.gu,s.title.en,s.title.gu].join(' ').toLowerCase().includes(search.toLowerCase()));}
  function renderStep(){
    const s=DATA.sections[active], filtered=!!search||onlySelected;const sections=filtered?DATA.sections:[s];let total=0;
    let body=`<section class="category-panel"><div class="step-header"><div><p class="eyebrow">${filtered?esc(t('results')):String(active+1).padStart(2,'0')+' / 11'}</p><h2 id="step-title" tabindex="-1">${esc(filtered?(onlySelected?t('selected'):t('results')):tr(s.title))}</h2><p>${esc(t('noteHint'))}</p></div></div>`;
    if(!filtered){const meta=state.sections[s.id]||{};body+=`<label class="section-toggle"><input type="checkbox" data-enabled="${s.id}" ${enabled(s.id)?'checked':''}>${esc(t('includeSection'))}</label>${!enabled(s.id)?`<p class="notice">${esc(t('excluded'))}</p>`:''}<details class="section-meta"><summary>${esc(t('sectionDetails'))}</summary><div class="field-grid">${META.map(k=>inputField(k,meta[k]||'',`data-section="${s.id}" data-meta="${k}"`,k==='notes'?'textarea':k==='date'?'date':k==='time'?'time':k==='guests'?'number':'text')).join('')}</div></details>`;}
    for(const section of sections)for(const group of section.groups){const list=group.items.filter(i=>matched(i,section));if(!list.length)continue;total+=list.length;body+=`<section class="service-group"><h3>${esc(filtered?tr(section.title)+' · '+tr(group.title):tr(group.title))}</h3><div class="items">${list.map(itemHTML).join('')}</div></section>`;}
    if(!total)body+=`<p>${esc(t('none'))}</p><button type="button" class="btn" data-action="clear">${esc(t('clearFilters'))}</button>`;
    body+=`<div class="step-footer"><button class="btn" type="button" data-step="${Math.max(0,active-1)}" ${active===0?'disabled':''}>${esc(t('back'))}</button><button class="btn primary" type="button" ${active===10?'data-action="review"':`data-step="${active+1}"`}>${esc(t(active===10?'review':'next'))}</button></div></section>`;
    $('#step-content').innerHTML=body;$('#result-count').textContent=`${total} ${t('results')}`;
  }
  function previousPanel(){
    const choices=OLD.map(([key,en,gu])=>{const old=read(key);if(!old)return '';return `<button type="button" data-restore="${key}">${esc(state.lang==='gu'?gu:en)}${old.client?.clientName?` · ${esc(str(old.client.clientName,100))}`:''}</button>`;}).join('');
    $('#older-drafts').hidden=!choices;$('#older-options').innerHTML=choices;
    $('#legacy-notice').hidden=state.previousHandled||!choices;$('#legacy-notice').textContent=t('olderNotice');
  }
  function pendingHTML(editable){
    if(!state.pending.length&&!state.previousServices.length)return '';
    let out=`<section class="pending-requests"><h3>${esc(t('placeTitle'))}</h3><p>${esc(t('placeHelp'))}</p>`;
    for(const p of state.pending){const m=DATA.masterMapping[p.sourceId];out+=`<article class="pending-card"><h4>${esc(tr(m.label))}</h4>${p.notes?`<p class="preserve-lines">${esc(p.notes)}</p>`:''}`;
      if(editable){out+=m.targets.map(id=>`<label><input type="checkbox" data-placement="${p.sourceId}" value="${id}">${esc(tr(MAP.get(id).sectionTitle))} · ${esc(tr(MAP.get(id).label))}</label>`).join('');out+=`<button type="button" class="btn" data-place="${p.sourceId}">${esc(t('place'))}</button> <button type="button" class="btn" data-omit="${p.sourceId}">${esc(t('omit'))}</button>`;}
      out+='</article>';
    }
    if(state.previousServices.length)out+=`<p>${esc(t('priorServices'))}: ${esc(state.previousServices.map(t).join(', '))}</p><p>${esc(t('previousHelp'))}</p>${editable?`<button type="button" class="btn" data-action="previous-done">${esc(t('previousDone'))}</button>`:''}`;
    return out+'</section>';
  }
  function summaryHTML(){
    const ids=Object.keys(selected()),count=new Set(ids.map(id=>MAP.get(id).sectionId)).size;
    return `<p class="brief-count">${ids.length} ${esc(t('selected'))} · ${count} ${esc(t('selectedSections'))}</p>`;
  }
  function briefRows(){
    return DATA.sections.map(s=>{
      if(!enabled(s.id))return '';
      const rows=s.groups.flatMap(g=>g.items).filter(i=>state.items[i.id]?.selected),meta=state.sections[s.id]||{};
      if(!rows.length&&!META.some(k=>meta[k]))return '';
      return `<section class="review-section"><h3>${esc(tr(s.title))}</h3><p class="review-meta">${esc(META.filter(k=>k!=='notes'&&meta[k]).map(k=>`${t(k)}: ${meta[k]}`).join(' · '))}</p>${rows.length?`<ul class="brief-items">${rows.map(i=>`<li><span class="brief-ref">${i.ref}</span><strong>${esc(tr(i.label))}</strong>${state.items[i.id].notes?`<p class="preserve-lines">${esc(state.items[i.id].notes)}</p>`:''}</li>`).join('')}</ul>`:`<p>${esc(t('noItems'))}</p>`}${meta.notes?`<p class="review-note preserve-lines">${esc(meta.notes)}</p>`:''}</section>`;
    }).join('');
  }
  function printHTML(){return `<p class="eyebrow">J.VARDHAN · ${esc(t('briefEyebrow'))}</p><h1>${esc(t('briefTitle'))}</h1><div class="print-client">${CLIENT.filter(k=>state.client[k]&&k!=='vendors').map(k=>`<p><b>${esc(t(k))}:</b> ${esc(state.client[k])}</p>`).join('')}</div>${summaryHTML()}${briefRows()}${pendingHTML(false)}`;}
  function renderReview(){
    let out=`<section class="review-intro"><button type="button" class="btn" data-action="back">← ${esc(t('backList'))}</button><h2 id="step-title" tabindex="-1">${esc(t('briefTitle'))}</h2><p>${esc(t('briefHelp'))}</p>${summaryHTML()}</section>${pendingHTML(true)}`;
    if(!Object.keys(selected()).length)out+=`<p class="notice">${esc(t('noSelection'))}</p>`;
    out+=`<div class="review-actions"><button type="button" class="btn primary" data-action="print">${esc(t('print'))}</button><button type="button" class="btn" data-action="download">${esc(t('download'))}</button><button type="button" class="btn" data-action="share">${esc(t('share'))}</button></div><div id="brief-sections">${briefRows()}</div>`;
    $('#step-content').innerHTML=out;$('#print-content').innerHTML=printHTML();
  }
  function render(){
    document.documentElement.lang=state.lang;document.title=state.lang==='gu'?'સંપૂર્ણ લગ્ન ચેકલિસ્ટ | J.Vardhan':'Complete Wedding Checklist | J.Vardhan';
    document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
    document.querySelectorAll('[data-lang]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.lang===state.lang)));
    $('#service-search').placeholder=t('searchPlaceholder');$('#service-search').value=search;
    $('#browse-controls').hidden=reviewing;$('#save-status').textContent=t(storageOK?'saved':'saveFailed');
    renderClient();renderNav();previousPanel();reviewing?renderReview():renderStep();
  }
  function navigate(n,isReview=false){active=Math.max(0,Math.min(10,n));reviewing=isReview;search='';onlySelected=false;render();$('#step-title')?.focus({preventScroll:true});$('#workspace').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  function download(contents,name,type){const url=URL.createObjectURL(new Blob([contents],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function briefText(){const holder=document.createElement('div');holder.innerHTML=printHTML();holder.querySelectorAll('p,h1,h2,h3,h4,article,section,div,dt,dd,span,b,strong,small').forEach(e=>e.append(document.createTextNode('\n')));return holder.textContent.replace(/\n{3,}/g,'\n\n');}
  document.addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.lang){state.lang=button.dataset.lang;save();render();return;}
    if(button.dataset.step!==undefined){navigate(Number(button.dataset.step));return;}
    if(button.id==='selected-filter'){onlySelected=!onlySelected;renderNav();renderStep();return;}
    if(button.dataset.restore){const raw=read(button.dataset.restore);if(!raw)return;try{if((Object.keys(state.items).length||CLIENT.some(k=>state.client[k]))&&!confirm(t('replaceConfirm')))return;state=normalize(raw);save();navigate(0);toast(t('kept'));}catch(e){toast(t('invalidFile')+' '+e.message);}return;}
    if(button.dataset.place){const id=button.dataset.place,pending=state.pending.find(v=>v.sourceId===id);const targets=[...document.querySelectorAll(`[data-placement="${id}"]:checked`)].map(e=>e.value);if(!targets.length){toast(t('selectPlacement'));return;}for(const target of targets){const old=state.items[target]||{};state.items[target]={...old,selected:true,notes:appendNote(old.notes,pending.notes)};state.sections[MAP.get(target).sectionId]={...state.sections[MAP.get(target).sectionId],inclusion:'include'};}state.pending=state.pending.filter(v=>v.sourceId!==id);save();render();return;}
    if(button.dataset.omit){state.pending=state.pending.filter(v=>v.sourceId!==button.dataset.omit);save();render();return;}
    const action=button.dataset.action;
    if(action==='review'||button.id==='review-nav')navigate(active,true);
    else if(action==='back')navigate(active);
    else if(action==='previous-done'){state.previousServices=[];save();render();}
    else if(action==='clear'){search='';onlySelected=false;render();}
    else if(action==='export'){download(JSON.stringify(state,null,2),'J-Vardhan-client-draft.json','application/json');toast(t('downloaded'));}
    else if(action==='import')$('#import-file').click();
    else if(action==='downloads'){$('#checklist-downloads').open=true;$('#checklist-downloads').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}
    else if(action==='reset'&&confirm(t('resetConfirm'))){const lang=state.lang;state=fresh();state.lang=lang;state.previousHandled=true;save();navigate(0);}
    else if(action==='print'){$('#print-content').innerHTML=printHTML();window.print();}
    else if(action==='download'){download('\uFEFF'+briefText(),`J-Vardhan-brief-${state.lang}.txt`,'text/plain;charset=utf-8');}
    else if(action==='share'){const text=briefText();try{if(navigator.share)await navigator.share({title:t('briefTitle'),text});else download('\uFEFF'+text,`J-Vardhan-brief-${state.lang}.txt`,'text/plain;charset=utf-8');}catch(e){if(e.name!=='AbortError')toast(e.message);}}
  });
  document.addEventListener('input',event=>{
    const e=event.target;
    if(e.id==='service-search'){search=e.value;renderStep();return;}
    if(e.dataset.client)state.client[e.dataset.client]=e.value;
    else if(e.dataset.note){state.items[e.dataset.note].notes=e.value;}
    else if(e.dataset.section){const id=e.dataset.section;state.sections[id]={...state.sections[id],[e.dataset.meta]:e.value};}
    else return;
    state.previousHandled=true;save();
    if(reviewing)renderReview();
  });
  document.addEventListener('change',async event=>{
    const e=event.target;
    if(e.id==='category-select'){navigate(Number(e.value));return;}
    if(e.dataset.select){const id=e.dataset.select;state.items[id]={...state.items[id],selected:e.checked,notes:state.items[id]?.notes||''};if(e.checked)state.sections[MAP.get(id).sectionId]={...state.sections[MAP.get(id).sectionId],inclusion:'include'};state.previousHandled=true;save();renderNav();renderStep();(document.getElementById(e.id)||$('#selected-filter')).focus({preventScroll:true});return;}
    if(e.dataset.enabled){state.sections[e.dataset.enabled]={...state.sections[e.dataset.enabled],inclusion:e.checked?'include':'skip'};save();renderNav();renderStep();return;}
    if(e.id==='import-file'){const file=e.files?.[0];if(!file)return;try{if(file.size>5000000)throw new Error('Draft is too large.');const next=normalize(JSON.parse(await file.text()));if(confirm(t('replaceConfirm'))){state=next;save();navigate(0);}}catch(error){toast(t('invalidFile')+' '+error.message);}finally{e.value='';}}
  });
  window.addEventListener('beforeprint',()=>{$('#print-content').innerHTML=printHTML();});
  render();
})();
