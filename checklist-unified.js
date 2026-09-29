/* One bilingual checklist; drafts and rate cards stay on this device. */
(() => {
  'use strict';
  const DATA=window.JV_CHECKLIST, P=window.JVPrice;
  const ITEMS=DATA.sections.flatMap(s=>s.groups.flatMap(g=>g.items.map(i=>({...i,sectionId:s.id,sectionTitle:s.title}))));
  const MAP=new Map(ITEMS.map(i=>[i.id,i]));
  const KEY='jvardhan-unified-checklist-v3', RATE_KEY='jvardhan-ceiling-rates-v1';
  const OLD=[['jvardhan-event-checklist-v1','Event checklist','પ્રસંગવાર યાદી'],['jvardhan-wedding-checklist-v1','Master checklist','માસ્ટર યાદી']];
  const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const COPY={
    backSite:['વેબસાઇટ પર પાછા','Back to website'],eyebrow:['તમારા પ્રસંગનું સંપૂર્ણ આયોજન','YOUR COMPLETE WEDDING CHECKLIST'],headline:['બધી વિગતો. એક સુંદર આયોજન.','Every detail. One beautiful plan.'],heroText:['૨૦૦ વસ્તુઓ, પ્રસંગ પ્રમાણે ગોઠવેલી. પસંદ કરો, નોંધ લખો અને તમારા ભાવથી પેકેજનો અંદાજ બનાવો.','200 items, organised around your celebration. Choose your services, add notes and build an estimate from your own prices.'],heroFoot:['૧૧ વિભાગો · ૨૦૦ વસ્તુઓ · એક યાદી','11 SECTIONS · 200 ITEMS · ONE CHECKLIST'],masterCount:['૨૦૦ વસ્તુઓ · ૧૧ વિભાગો','200 ITEMS · 11 SECTIONS'],photoCaption:['તમારી પસંદગી, તમારી ઉજવણી','Your choices, your celebration'],yourCelebration:['આયોજનના વિભાગો','PLANNING SECTIONS'],review:['પેકેજની સમીક્ષા','Review package'],chooseCategory:['વિભાગ પસંદ કરો','Choose a section'],searchLabel:['બધી ૨૦૦ વસ્તુઓમાં શોધો','Search all 200 items'],selectedOnly:['પસંદ કરેલી','Selected'],searchPlaceholder:['ફૂલો, હોટેલ, ડીજે…','Flowers, hotel, DJ…'],clearFilters:['ફિલ્ટર દૂર કરો','Clear filters'],results:['પરિણામો','results'],selected:['પસંદ કરેલી વસ્તુઓ','selected items'],saved:['આ ઉપકરણમાં સાચવ્યું','Saved on this device'],saveFailed:['સાચવી શકાયું નથી. ડ્રાફ્ટ ડાઉનલોડ કરો.','Could not save. Download your draft.'],localNotice:['તમારી પસંદગી અને ભાવ આ બ્રાઉઝરમાં રહે છે. ક્લાયન્ટ માટે સારાંશ શેર કરો.','Selections and prices stay in this browser. Share the package summary with your client.'],clientDetails:['ક્લાયન્ટ અને પ્રસંગની વિગતો','Client & celebration details'],optional:['વૈકલ્પિક','Optional'],clientName:['ક્લાયન્ટ / પરિવાર','Client / family'],couple:['વર-વધૂનાં નામ','Bride & groom'],date:['તારીખ','Date'],time:['સમય','Time'],location:['સ્થળ / શહેર','Venue / city'],phone:['મોબાઇલ','Phone'],contact:['સંપર્ક વ્યક્તિ','Contact person'],guests:['મહેમાનો','Guests'],overallBudget:['કુલ બજેટ (₹)','Overall budget (₹)'],preferences:['થીમ અને ખાસ પસંદગી','Theme & preferences'],vendors:['વેન્ડરના સંપર્કો','Vendor contacts'],notes:['નોંધ','Notes'],shortNote:['ટૂંકી નોંધ (વૈકલ્પિક)','Short note (optional)'],noteHint:['સંખ્યા, રંગ, સમય કે ખાસ પસંદગી…','Quantity, colour, timing or a preference…'],confirmDetail:['વિગત નક્કી કરો','Detail to confirm'],sectionDetails:['આ પ્રસંગની તારીખ, સ્થળ અને નોંધ','Dates, venue & notes for this section'],includeSection:['પેકેજમાં આ વિભાગ સામેલ કરો','Include this section in the package'],excluded:['આ વિભાગ પેકેજમાં સામેલ નથી. પસંદગી સચવાયેલી છે.','This section is excluded from the package. Its selections are retained.'],none:['કોઈ વસ્તુ મળી નથી.','No items found.'],back:['પાછળ','Back'],next:['આગળ','Next'],backList:['યાદીમાં પાછા જાઓ','Back to checklist'],footer:['સાથે મળીને, સુંદર આયોજન.','Thoughtfully planned. Together.'],portfolio:['અમારું કામ જુઓ','Explore our work'],draftTools:['ડ્રાફ્ટ સાચવો / ખોલો','Drafts & backup'],saveDraft:['ભાવ સાથે સંપાદનયોગ્ય ડ્રાફ્ટ ડાઉનલોડ કરો','Back up editable draft (includes prices)'],openDraft:['ડ્રાફ્ટ ખોલો','Open saved draft'],newClient:['નવો ક્લાયન્ટ','New client'],resetConfirm:['હાલનો ક્લાયન્ટ ડ્રાફ્ટ સાફ કરવો છે? ભાવપત્રક સચવાશે. પહેલાં જરૂર હોય તો ડ્રાફ્ટ ડાઉનલોડ કરો.','Clear the current client draft? Your rate card will be kept. Download a backup first if needed.'],replaceConfirm:['આ ફાઇલથી હાલનો ક્લાયન્ટ ડ્રાફ્ટ બદલવો છે?','Replace the current client draft with this file?'],rateTools:['ભાવપત્રક અને ડાઉનલોડ','Rates & downloads'],loadRates:['ભરેલું Excel / CSV ખોલો','Load completed Excel / CSV'],rateTemplate:['ભાવ ભરવા માટે Excel ડાઉનલોડ કરો','Download pricing Excel'],pdfEn:['અંગ્રેજી A4 ચેકલિસ્ટ','English A4 checklist'],pdfGu:['ગુજરાતી A4 ચેકલિસ્ટ','Gujarati A4 checklist'],rateHelp:['તમારા સામાન્ય ક્લાયન્ટ ભાવ ભરો. ભાવ ઉપલબ્ધ ન હોય ત્યાં ખાલી રાખો.','Enter your standard client prices. Leave unknown rates blank.'],noRates:['હજુ ભાવ ઉમેર્યા નથી.','No prices loaded yet.'],priced:['વસ્તુઓના ભાવ ભરેલા','items with a rate'],applyRates:['આ ભાવપત્રક લાગુ કરો','Apply this rate card'],cancel:['રદ કરો','Cancel'],imported:['ભાવપત્રક લાગુ થયું.','Rate card applied.'],olderDrafts:['અગાઉના સાચવેલા ડ્રાફ્ટ','Previous saved checklists'],olderNotice:['અગાઉની યાદીઓ સચવાયેલી છે. નીચેમાંથી એક ડ્રાફ્ટ ખોલો; બે ક્લાયન્ટની વિગતો આપમેળે ભળશે નહીં.','Earlier checklists are available below. Open one saved draft to continue it.'],open:['ખોલો','Open'],placeTitle:['અગાઉની સેવાઓને યોગ્ય પ્રસંગમાં મૂકો','Place earlier services in the right event'],placeHelp:['આ સેવાઓનો અંદાજ હજી બાકી છે. લાગુ પડતી વસ્તુઓ પસંદ કરો.','These earlier requests are not priced yet. Choose the relevant checklist items.'],place:['પસંદ કરેલી જગ્યાએ ઉમેરો','Add to selected items'],omit:['હાલ જરૂરી નથી','Not needed now'],priorServices:['અગાઉ નોંધેલી સામાન્ય સેવાઓ','Earlier general service requests'],quantity:['સંખ્યા','Quantity'],unitRate:['મૂળ એકમ ભાવ','Standard unit rate'],lineDiscount:['આ વસ્તુ પર છૂટ (₹)','Line discount (₹)'],lineTotal:['આ વસ્તુનો ભાવ','Line total'],toPrice:['ભાવ નક્કી કરવો','Rate needed'],included:['પેકેજમાં સામેલ','Included in package'],covered:['એકમ પેકેજમાં સામેલ','units covered by package'],scope:['ભાવમાં સામેલ','Price includes'],quoteTitle:['તમારી ઉજવણીનું પેકેજ','Your celebration package'],smartReview:['સ્માર્ટ પેકેજ સમીક્ષા','SMART PACKAGE REVIEW'],mathNote:['પસંદ કરેલી વસ્તુઓ, સંખ્યા અને તમારા ભાવપત્રક પરથી ગણતરી.','Calculated from your selected items, quantities and rate card.'],standard:['મૂળ કુલ કિંમત','Standard total'],lineSavings:['વસ્તુઓ પર છૂટ','Line discounts'],packageDiscount:['પેકેજ પર છૂટ','Package discount'],discountType:['છૂટનો પ્રકાર','Discount type'],amount:['રકમ (₹)','Amount (₹)'],percent:['ટકા (%)','Percent (%)'],extra:['વધારાનો ખર્ચ (₹)','Additional charges (₹)'],tax:['કર (%) — લાગુ પડે તો','Tax (%) — if applicable'],taxAmount:['કરની રકમ','Tax amount'],offer:['પેકેજનો અંદાજિત ભાવ','Estimated package price'],partial:['હાલ ભાવ ભરેલી વસ્તુઓનો અંદાજ','Partial estimate for priced items'],savings:['કુલ બચત','Total savings'],pending:['વસ્તુઓના ભાવ / સ્થાન બાકી','items still need pricing / placement'],fixNumbers:['સંખ્યા અથવા છૂટની રકમ સુધારો.','Correct the highlighted quantities or discounts.'],noSelection:['પહેલાં જરૂરી વસ્તુઓ પસંદ કરો.','Choose some services to build your package.'],print:['પ્રિન્ટ / PDF','Print / save PDF'],download:['સારાંશ ડાઉનલોડ','Download summary'],share:['સારાંશ શેર કરો','Share summary'],downloaded:['ડાઉનલોડ તૈયાર છે.','Download ready.'],invalidFile:['ફાઇલ ખોલી શકાઈ નથી.','Could not open the file.'],rateLoaded:['ભાવ અપલોડ થયા','Rates loaded'],budgetLeft:['બજેટમાં બાકી','Remaining budget'],overBudget:['બજેટથી વધુ','Above budget'],selectedSections:['વિભાગોમાંથી પસંદગી','sections represented'],sectionNotes:['વિભાગની નોંધ','Section notes'],restore:['જૂનો ડ્રાફ્ટ પુનઃખોલો','Restore previous draft'],selectPlacement:['ઓછામાં ઓછી એક વસ્તુ પસંદ કરો.','Choose at least one matching item.'],extraRequests:['વધારાની માંગ / અગાઉની નોંધ','Additional requests / earlier notes'],ready:['ચર્ચા માટે તૈયાર','Ready to discuss'],incomplete:['ભાવ પૂર્ણ કરવાના બાકી','Prices still to confirm'],invalid:['આંકડા તપાસો','Check the numbers'],unit:['એકમ','Unit'],kept:['અગાઉની માહિતી ડ્રાફ્ટમાં સચવાઈ છે.','Earlier information is preserved in the draft.']
  };
  Object.assign(COPY,{
    decor:['સજાવટ અને ફૂલો','Decor & flowers'],stage:['સ્ટેજ અને બેઠક','Stage & seating'],sound:['લાઇટ અને સાઉન્ડ','Lighting & sound'],photo:['ફોટો અને વીડિયો','Photo & video'],food:['જમવાની વ્યવસ્થા','Food & catering'],guestHelp:['મહેમાનોની વ્યવસ્થા','Guest hospitality'],entertainment:['સંગીત અને મનોરંજન','Music & entertainment'],rituals:['વિધિની વ્યવસ્થા','Ritual arrangements'],
    previousHelp:['આ સામાન્ય માંગ માટે યાદીમાં યોગ્ય વસ્તુઓ પસંદ કરો, પછી નીચે નક્કી કરો.','Select the relevant checklist items for these earlier requests, then confirm below.'],previousDone:['આ માંગ યાદીમાં ઉમેરી દીધી છે','I have added these requests to the checklist']
  });
  const CLIENT=['clientName','couple','date','location','phone','contact','guests','overallBudget','preferences','vendors'];
  const META=['date','time','location','guests','notes'];
  let storageOK=true,active=0,reviewing=false,search='',onlySelected=false,toastTimer,pendingRates=null;
  function read(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch(_){storageOK=false;return null;}}
  function write(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true;}catch(_){storageOK=false;return false;}}
  const str=(v,max=6000)=>typeof v==='string'?v.slice(0,max):typeof v==='number'?String(v):'';
  function safeRates(value){const rates={};for(const [id,r] of Object.entries(value||{})){if(!MAP.has(id))continue;rates[id]={cents:r.cents,unit:r.unit,scope:str(r.scope,1500),includedIn:str(r.includedIn,100),includedQty:r.includedQty??null};}return P.validateRates(rates,ITEMS);}
  let sharedRates={rates:{},filename:''};try{const saved=read(RATE_KEY);if(saved)sharedRates={...saved,rates:safeRates(saved.rates)};}catch(_){storageOK=false;}
  const fresh=()=>({version:3,source:DATA.source,lang:'gu',client:{},sections:{},items:{},pending:[],previousServices:[],archive:null,previousHandled:false,pricing:{rates:structuredClone(sharedRates.rates),filename:sharedRates.filename||'',discountMode:'amount',discount:'0',extra:'0',tax:'0'}});
  function appendNote(old,addition){return [...new Set([str(old),str(addition)].filter(Boolean))].join('\n').slice(0,6000);}
  function oldNote(v){return [v.quantity?`Quantity / સંખ્યા: ${str(v.quantity,80)}`:'',v.owner&&v.owner!=='tbd'?`Responsible / જવાબદારી: ${str(v.owner,80)}`:'',v.status&&v.status!=='discuss'?`Status / સ્થિતિ: ${str(v.status,80)}`:'',str(v.notes)].filter(Boolean).join('\n');}
  function normalize(raw){
    if(!raw||![1,2,3].includes(raw.version)||!raw.items||typeof raw.items!=='object'||!raw.sections||typeof raw.sections!=='object')throw new Error('Invalid checklist draft.');
    const v=fresh();v.lang=raw.lang==='en'?'en':'gu';
    CLIENT.forEach(k=>v.client[k]=str(raw.client?.[k]));
    if(!v.client.location)v.client.location=str(raw.client?.city);
    const restore=source=>{
      for(const s of DATA.sections){const old=source.sections?.[s.id];if(!old)continue;v.sections[s.id]={inclusion:old.inclusion==='skip'?'skip':'include'};META.forEach(k=>v.sections[s.id][k]=str(old[k]));}
      for(const id of MAP.keys()){const old=source.items?.[id];if(!old||typeof old!=='object')continue;v.items[id]={selected:old.selected===true,notes:raw.version===3?str(old.notes):oldNote(old),quantity:raw.version===3?str(old.quantity??'1',30):'1',discount:raw.version===3?str(old.discount??'0',30):'0'};}
    };
    if(raw.version===3){
      restore(raw);v.previousHandled=raw.previousHandled===true;v.archive=raw.archive||null;
      v.previousServices=Array.isArray(raw.previousServices)?raw.previousServices.map(x=>str(x,300)).slice(0,30):[];
      v.pending=Array.isArray(raw.pending)?raw.pending.filter(x=>DATA.masterMapping[x.sourceId]).map(x=>({sourceId:x.sourceId,notes:str(x.notes),selected:x.selected===true})):[];
      if(raw.pricing){v.pricing={rates:safeRates(raw.pricing.rates),filename:str(raw.pricing.filename,200),discountMode:raw.pricing.discountMode==='percent'?'percent':'amount',discount:str(raw.pricing.discount??'0',30),extra:str(raw.pricing.extra??'0',30),tax:str(raw.pricing.tax??'0',30)};}
    }else{
      restore(raw.version===1?raw:raw.legacy||{});v.previousHandled=true;v.archive=raw;
      v.previousServices=Array.isArray(raw.services)?raw.services.map(x=>str(x,100)).slice(0,30):[];
      if(raw.version===2)for(const [sourceId,m] of Object.entries(DATA.masterMapping)){
        const old=raw.items[sourceId];if(!old||(!old.selected&&!old.notes))continue;
        if(m.targets.length===1){const id=m.targets[0];v.items[id]={...(v.items[id]||{quantity:'1',discount:'0'}),selected:!!(old.selected||v.items[id]?.selected),notes:appendNote(v.items[id]?.notes,oldNote(old))};}
        else v.pending.push({sourceId,notes:oldNote(old),selected:old.selected===true});
      }
    }
    return v;
  }
  let state=fresh();try{const saved=read(KEY);if(saved)state=normalize(saved);}catch(_){storageOK=false;}
  const queryLang=new URLSearchParams(location.search).get('lang');if(['gu','en'].includes(queryLang))state.lang=queryLang;
  const t=k=>COPY[k]?.[state.lang==='gu'?0:1]??k, tr=x=>x?.[state.lang]??'';
  const money=c=>new Intl.NumberFormat(state.lang==='gu'?'gu-IN':'en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(c/100);
  const enabled=id=>state.sections[id]?.inclusion!=='skip';
  const selected=()=>Object.fromEntries(Object.entries(state.items).filter(([id,v])=>v.selected&&MAP.has(id)&&enabled(MAP.get(id).sectionId)));
  const calc=()=>P.calculate(ITEMS,selected(),state.pricing,state.pending.filter(x=>x.selected).length+state.previousServices.length);
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
  function summaryHTML(c){
    const status=c.problems.length?'invalid':c.complete?'ready':'incomplete';
    let out=`<section class="package-summary ${c.complete?'complete':'partial'}"><p class="eyebrow">${esc(t('smartReview'))}</p><h2>${esc(t(status))}</h2><p>${c.rows.length} ${esc(t('selected'))} · ${c.sections} ${esc(t('selectedSections'))}</p><div class="offer-amount"><span>${esc(t(c.complete?'offer':'partial'))}</span><strong>${c.problems.length?'—':esc(money(c.total))}</strong></div><dl><div><dt>${esc(t('standard'))}</dt><dd>${esc(money(c.base))}</dd></div><div><dt>${esc(t('lineSavings'))}</dt><dd>− ${esc(money(c.lineDiscount))}</dd></div><div><dt>${esc(t('packageDiscount'))}</dt><dd>− ${esc(money(c.packageDiscount))}</dd></div><div><dt>${esc(t('extra'))}</dt><dd>${esc(money(c.extra))}</dd></div><div><dt>${esc(t('taxAmount'))} (${c.taxPercent}%)</dt><dd>${esc(money(c.tax))}</dd></div></dl>`;
    if(c.savings&&!c.problems.length)out+=`<p class="savings">${esc(t('savings'))}: <b>${esc(money(c.savings))}</b></p>`;
    if(c.missing+c.unplaced)out+=`<p class="estimate-warning">${c.missing+c.unplaced} ${esc(t('pending'))}.</p>`;
    if(c.problems.length)out+=`<p class="estimate-warning" role="alert">${esc(t('fixNumbers'))}</p>`;
    try{const budget=P.money(state.client.overallBudget,true);if(budget!==null&&c.complete)out+=`<p>${esc(t(c.total>budget?'overBudget':'budgetLeft'))}: ${esc(money(Math.abs(budget-c.total)))}</p>`;}catch(_){}
    return out+`<small>${esc(t('mathNote'))}</small></section>`;
  }
  function quoteRows(c,editable){
    return DATA.sections.map(s=>{const rows=c.rows.filter(r=>r.item.sectionId===s.id);if(!rows.length)return '';const meta=state.sections[s.id]||{};
      let out=`<section class="quote-section"><h3>${esc(tr(s.title))}</h3><p class="review-meta">${esc(META.filter(k=>k!=='notes'&&meta[k]).map(k=>`${t(k)}: ${meta[k]}`).join(' · '))}</p>`;
      for(const r of rows){const v=state.items[r.id];out+=`<article data-quote-id="${r.id}" class="quote-line${r.error?' invalid-row':''}"><div class="quote-item-title"><small>${r.item.ref}</small><strong>${esc(tr(r.item.label))}</strong></div>${v.notes?`<p class="quote-note preserve-lines">${esc(v.notes)}</p>`:''}${r.scope?`<p class="quote-note">${esc(t('scope'))}: ${esc(r.scope)}</p>`:''}<div class="quote-line-values">`;
        out+=editable?`<label>${esc(t('quantity'))} <small>(${esc(r.unit)})</small><input type="number" min="0.001" max="1000000" step="0.001" data-qty="${r.id}" value="${esc(v.quantity??'1')}" aria-invalid="${r.error==='quantity'}"></label>`:`<span>${esc(t('quantity'))}: ${r.qty} ${esc(r.unit)}</span>`;
        out+=`<span>${esc(t('unitRate'))}<b data-unit-rate="${r.id}">${r.unitCents===null?esc(r.billable===0?t('included'):t('toPrice')):esc(money(r.unitCents))}</b></span>`;
        out+=editable?`<label>${esc(t('lineDiscount'))}<input type="number" min="0" step="0.01" data-line-discount="${r.id}" value="${esc(v.discount??'0')}" aria-invalid="${r.error==='line discount'}"></label>`:`<span>${esc(t('lineSavings'))}: ${esc(money(r.discount))}</span>`;
        out+=`<span class="line-total">${esc(t('lineTotal'))}<b>${r.error?'—':r.net===null?esc(t('toPrice')):esc(money(r.net))}</b></span></div><p class="quote-note" data-coverage="${r.id}" ${r.covered?'':'hidden'}>${r.covered} ${esc(t('covered'))} · ${esc(MAP.get(r.parent)?.ref||'')}</p></article>`;
      }
      if(meta.notes)out+=`<p class="review-note preserve-lines">${esc(meta.notes)}</p>`;return out+'</section>';
    }).join('');
  }
  function printHTML(){const c=calc();return `<p class="eyebrow">J.VARDHAN · ${esc(t('smartReview'))}</p><h1>${esc(t('quoteTitle'))}</h1><div class="print-client">${CLIENT.filter(k=>state.client[k]&&k!=='vendors').map(k=>`<p><b>${esc(t(k))}:</b> ${esc(state.client[k])}</p>`).join('')}</div>${summaryHTML(c)}${quoteRows(c,false)}${pendingHTML(false)}`;}
  function renderReview(){
    const c=calc();let out=`<section class="review-intro"><button type="button" class="btn" data-action="back">← ${esc(t('backList'))}</button><h2 id="step-title" tabindex="-1">${esc(t('quoteTitle'))}</h2><p>${esc(t('mathNote'))}</p></section>${pendingHTML(true)}`;
    if(!c.rows.length)out+=`<p class="notice">${esc(t('noSelection'))}</p>`;
    out+=`<div id="package-summary">${summaryHTML(c)}</div><details class="package-controls" open><summary>${esc(t('packageDiscount'))}</summary><div class="field-grid"><label class="field">${esc(t('discountType'))}<select data-pricing="discountMode"><option value="amount" ${state.pricing.discountMode==='amount'?'selected':''}>${esc(t('amount'))}</option><option value="percent" ${state.pricing.discountMode==='percent'?'selected':''}>${esc(t('percent'))}</option></select></label>${inputField('packageDiscount',state.pricing.discount,'data-pricing="discount"','number')}${inputField('extra',state.pricing.extra,'data-pricing="extra"','number')}${inputField('tax',state.pricing.tax,'data-pricing="tax"','number')}</div></details><div class="review-actions"><button type="button" class="btn primary" data-action="print">${esc(t('print'))}</button><button type="button" class="btn" data-action="download">${esc(t('download'))}</button><button type="button" class="btn" data-action="share">${esc(t('share'))}</button></div><div id="quote-lines">${quoteRows(c,true)}</div>`;
    $('#step-content').innerHTML=out;$('#print-content').innerHTML=printHTML();
  }
  function renderRateStatus(){const count=Object.values(state.pricing.rates).filter(r=>r.cents!==null).length;$('#rate-status').textContent=count?`${count} / 200 ${t('priced')}`:t('noRates');}
  function refreshQuote(){
    const c=calc();$('#package-summary').innerHTML=summaryHTML(c);
    for(const r of c.rows){const line=document.querySelector(`[data-quote-id="${r.id}"]`);if(!line)continue;line.classList.toggle('invalid-row',!!r.error);line.querySelector('.line-total b').textContent=r.error?'—':r.net===null?t('toPrice'):money(r.net);line.querySelector('[data-unit-rate]').textContent=r.unitCents===null?(r.billable===0?t('included'):t('toPrice')):money(r.unitCents);line.querySelector('[data-qty]')?.setAttribute('aria-invalid',String(r.error==='quantity'));line.querySelector('[data-line-discount]')?.setAttribute('aria-invalid',String(r.error==='line discount'));const cover=line.querySelector('[data-coverage]');cover.hidden=!r.covered;cover.textContent=`${r.covered} ${t('covered')} · ${MAP.get(r.parent)?.ref||''}`;}
    for(const [key,error] of [['discount','package discount'],['extra','additional charges'],['tax','tax percentage']])document.querySelector(`[data-pricing="${key}"]`)?.setAttribute('aria-invalid',String(c.problems.some(p=>p.error===error)));
    $('#print-content').innerHTML=printHTML();
  }
  function render(){
    document.documentElement.lang=state.lang;document.title=state.lang==='gu'?'સંપૂર્ણ લગ્ન ચેકલિસ્ટ | J.Vardhan':'Complete Wedding Checklist | J.Vardhan';
    document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
    document.querySelectorAll('[data-lang]').forEach(e=>e.setAttribute('aria-pressed',String(e.dataset.lang===state.lang)));
    $('#service-search').placeholder=t('searchPlaceholder');$('#service-search').value=search;
    $('#browse-controls').hidden=reviewing;$('#save-status').textContent=t(storageOK?'saved':'saveFailed');
    renderClient();renderNav();renderRateStatus();previousPanel();reviewing?renderReview():renderStep();
  }
  function navigate(n,isReview=false){active=Math.max(0,Math.min(10,n));reviewing=isReview;search='';onlySelected=false;render();$('#step-title')?.focus({preventScroll:true});$('#workspace').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  function download(contents,name,type){const url=URL.createObjectURL(new Blob([contents],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function briefText(){const holder=document.createElement('div');holder.innerHTML=printHTML();holder.querySelectorAll('p,h1,h2,h3,h4,article,section,div,dt,dd,span,b,strong,small').forEach(e=>e.append(document.createTextNode('\n')));return holder.textContent.replace(/\n{3,}/g,'\n\n');}
  function guardQuote(){if(calc().problems.length){toast(t('fixNumbers'));return false;}return true;}
  document.addEventListener('click',async event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.lang){state.lang=button.dataset.lang;save();render();return;}
    if(button.dataset.step!==undefined){navigate(Number(button.dataset.step));return;}
    if(button.id==='selected-filter'){onlySelected=!onlySelected;renderNav();renderStep();return;}
    if(button.dataset.restore){const raw=read(button.dataset.restore);if(!raw)return;try{if((Object.keys(state.items).length||CLIENT.some(k=>state.client[k]))&&!confirm(t('replaceConfirm')))return;state=normalize(raw);save();navigate(0);toast(t('kept'));}catch(e){toast(t('invalidFile')+' '+e.message);}return;}
    if(button.dataset.place){const id=button.dataset.place,pending=state.pending.find(v=>v.sourceId===id);const targets=[...document.querySelectorAll(`[data-placement="${id}"]:checked`)].map(e=>e.value);if(!targets.length){toast(t('selectPlacement'));return;}for(const target of targets){const old=state.items[target]||{};state.items[target]={...old,selected:true,notes:appendNote(old.notes,pending.notes),quantity:old.quantity||'1',discount:old.discount||'0'};state.sections[MAP.get(target).sectionId]={...state.sections[MAP.get(target).sectionId],inclusion:'include'};}state.pending=state.pending.filter(v=>v.sourceId!==id);save();render();return;}
    if(button.dataset.omit){state.pending=state.pending.filter(v=>v.sourceId!==button.dataset.omit);save();render();return;}
    const action=button.dataset.action;
    if(action==='review'||button.id==='review-nav')navigate(active,true);
    else if(action==='back')navigate(active);
    else if(action==='previous-done'){state.previousServices=[];save();render();}
    else if(action==='clear'){search='';onlySelected=false;render();}
    else if(action==='export'){download(JSON.stringify(state,null,2),'J-Vardhan-client-draft.json','application/json');toast(t('downloaded'));}
    else if(action==='import')$('#import-file').click();
    else if(action==='load-rates')$('#rates-file').click();
    else if(action==='rate-tools'){$('#rate-tools').open=true;$('#rate-tools').scrollIntoView({behavior:'smooth',block:'center'});}
    else if(action==='apply-rates'&&pendingRates){state.pricing.rates=pendingRates.rates;state.pricing.filename=pendingRates.filename;sharedRates={rates:pendingRates.rates,filename:pendingRates.filename};write(RATE_KEY,sharedRates);pendingRates=null;$('#rate-preview').hidden=true;save();render();toast(t('imported'));}
    else if(action==='cancel-rates'){pendingRates=null;$('#rate-preview').hidden=true;}
    else if(action==='reset'&&confirm(t('resetConfirm'))){const lang=state.lang;state=fresh();state.lang=lang;state.previousHandled=true;save();navigate(0);}
    else if(action==='print'&&guardQuote()){$('#print-content').innerHTML=printHTML();window.print();}
    else if(action==='download'&&guardQuote()){download('\uFEFF'+briefText(),`J-Vardhan-package-${state.lang}.txt`,'text/plain;charset=utf-8');}
    else if(action==='share'&&guardQuote()){const text=briefText();try{if(navigator.share)await navigator.share({title:t('quoteTitle'),text});else download('\uFEFF'+text,`J-Vardhan-package-${state.lang}.txt`,'text/plain;charset=utf-8');}catch(e){if(e.name!=='AbortError')toast(e.message);}}
  });
  document.addEventListener('input',event=>{
    const e=event.target;
    if(e.id==='service-search'){search=e.value;renderStep();return;}
    if(e.dataset.client)state.client[e.dataset.client]=e.value;
    else if(e.dataset.note){state.items[e.dataset.note].notes=e.value;}
    else if(e.dataset.section){const id=e.dataset.section;state.sections[id]={...state.sections[id],[e.dataset.meta]:e.value};}
    else if(e.dataset.qty){state.items[e.dataset.qty].quantity=e.value;}
    else if(e.dataset.lineDiscount){state.items[e.dataset.lineDiscount].discount=e.value;}
    else if(e.dataset.pricing){state.pricing[e.dataset.pricing]=e.value;}
    else return;
    state.previousHandled=true;save();
    if(reviewing)refreshQuote();
  });
  document.addEventListener('change',async event=>{
    const e=event.target;
    if(e.id==='category-select'){navigate(Number(e.value));return;}
    if(e.dataset.select){const id=e.dataset.select;state.items[id]={...state.items[id],selected:e.checked,notes:state.items[id]?.notes||'',quantity:state.items[id]?.quantity||'1',discount:state.items[id]?.discount||'0'};if(e.checked)state.sections[MAP.get(id).sectionId]={...state.sections[MAP.get(id).sectionId],inclusion:'include'};state.previousHandled=true;save();renderNav();renderStep();(document.getElementById(e.id)||$('#selected-filter')).focus({preventScroll:true});return;}
    if(e.dataset.enabled){state.sections[e.dataset.enabled]={...state.sections[e.dataset.enabled],inclusion:e.checked?'include':'skip'};save();renderNav();renderStep();return;}
    if(e.dataset.qty||e.dataset.lineDiscount||e.dataset.pricing){if(e.dataset.pricing)state.pricing[e.dataset.pricing]=e.value;save();refreshQuote();return;}
    if(e.id==='rates-file'){
      const file=e.files?.[0];if(!file)return;
      try{pendingRates=await P.importFile(file,ITEMS);$('#rate-preview').innerHTML=`<p>${pendingRates.priced} / 200 ${esc(t('priced'))} · ${esc(pendingRates.filename)}</p><button type="button" data-action="apply-rates">${esc(t('applyRates'))}</button><button type="button" data-action="cancel-rates">${esc(t('cancel'))}</button>`;$('#rate-preview').hidden=false;}
      catch(error){pendingRates=null;$('#rate-preview').hidden=true;toast(t('invalidFile')+' '+error.message);}finally{e.value='';}return;
    }
    if(e.id==='import-file'){const file=e.files?.[0];if(!file)return;try{if(file.size>5000000)throw new Error('Draft is too large.');const next=normalize(JSON.parse(await file.text()));if(confirm(t('replaceConfirm'))){state=next;save();navigate(0);}}catch(error){toast(t('invalidFile')+' '+error.message);}finally{e.value='';}}
  });
  window.addEventListener('beforeprint',()=>{$('#print-content').innerHTML=printHTML();});
  render();
})();
