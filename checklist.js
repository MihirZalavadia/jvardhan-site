/* Static, bilingual planning worksheet. No answers leave the browser automatically. */
(() => {
  'use strict';
  const DATA = window.JV_CHECKLIST.sections;
  const KEY = 'jvardhan-wedding-checklist-v1';
  const $ = (selector) => document.querySelector(selector);
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const COPY = {
    backSite:['વેબસાઇટ પર પાછા','Back to website'],eyebrow:['તમારા પ્રસંગનું આયોજન','THE WEDDING PLANNER'],headline:['તમારાં લગ્ન. દરેક વિગત, સાથે મળીને.','Your wedding. Every detail, together.'],heroText:['મંડપ રોપણથી વિદાય સુધી — તમારી પસંદગી, તમારી પરંપરા અને તમારી રીતે ઉજવણી.','From Mandap Ropan to the final farewell. Your choices, your traditions, your kind of celebration.'],heroFoot:['પસંદ કરો · સાથે નક્કી કરો · યાદગાર બનાવો','CHOOSE · PLAN TOGETHER · CELEBRATE'],photoCaption:['શુભ શરૂઆતથી સુંદર યાદો સુધી','From meaningful beginnings to beautiful memories'],yourCelebration:['તમારી ઉજવણી','YOUR CELEBRATION'],review:['પસંદગીની સમીક્ષા','Review your choices'],localNotice:['આ ડ્રાફ્ટ આ બ્રાઉઝરમાં રહે છે. આયોજકને મોકલવા માટે સારાંશ ડાઉનલોડ અથવા શેર કરો.','Your draft stays in this browser. Download or share the brief to send it to your planner.'],draftTools:['ડ્રાફ્ટ અને પ્રેઝન્ટેશન','Drafts & presentation'],saveDraft:['ફરી ખોલી શકાય એવો ડ્રાફ્ટ ડાઉનલોડ કરો','Download a draft to reopen later'],openDraft:['સાચવેલો ડ્રાફ્ટ ખોલો','Open a saved draft'],deck:['પ્રેઝન્ટેશન ડાઉનલોડ કરો','Download meeting PowerPoint'],newClient:['નવા ક્લાયન્ટ માટે શરૂ કરો','Start for a new client'],clientDetails:['પરિવાર અને પ્રસંગની વિગતો','Family & celebration details'],optional:['વૈકલ્પિક','Optional'],footer:['સાથે મળીને, સુંદર આયોજન.','Thoughtfully planned. Together.'],portfolio:['અમારું કામ જુઓ','Explore our work'],saved:['આ બ્રાઉઝરમાં સાચવ્યું','Saved in this browser'],saveFailed:['બ્રાઉઝરમાં સાચવી શકાતું નથી — ડ્રાફ્ટ ડાઉનલોડ કરો.','Browser saving is unavailable. Download your draft.'],step:['વિભાગ','SECTION'],of:['માંથી','of'],functionState:['આ વિભાગને આયોજનમાં રાખવો છે?','Include this in your celebration?'],functionHint:['પછીથી પણ બદલી શકો છો.','You can always change this later.'],considering:['હજુ નક્કી કરવાનું છે','Still deciding'],include:['હા, આયોજનમાં રાખો','Yes, include it'],skip:['હાલ જરૂરી નથી','Not needed for now'],selectionHint:['જરૂરી વસ્તુ પસંદ કરો, પછી સંખ્યા, જવાબદારી અને સ્થિતિ નોંધો. પસંદ કરેલું એટલે બુક થઈ ગયું એવું નથી.','Tick what you would like, then add quantities, responsibility and progress. A tick is a request, not a booking.'],sourceNote:['વિગત નક્કી કરવાની છે','Detail to confirm'],quantity:['સંખ્યા / માપ','Quantity / size'],owner:['જવાબદારી','Responsible'],status:['આયોજનની સ્થિતિ','Planning status'],itemNotes:['વિગત / ડિઝાઇન / વેન્ડર','Details / design / vendor'],tbd:['નક્કી કરવાનું બાકી','To be decided'],planner:['આયોજક','Planner'],family:['પરિવાર','Family'],venue:['વેન્યુ','Venue'],vendor:['વેન્ડર','Vendor'],discuss:['ચર્ચા બાકી','To discuss'],confirmed:['વ્યવસ્થા નક્કી','Arrangement confirmed'],done:['પૂર્ણ થયું','Completed'],date:['તારીખ','Date'],time:['સમય / મુહૂર્ત','Time / muhurat'],guests:['અંદાજિત મહેમાનો','Expected guests'],budget:['અંદાજિત બજેટ (₹)','Budget estimate (₹)'],location:['સ્થળ / વેન્યુ','Location / venue'],sectionNotes:['બીજી જરૂરિયાતો, પરિવારની પરંપરા અથવા ખાસ નોંધ','Anything else? Family traditions, additional items or special requests'],notesPlaceholder:['અહીં લખો…','Write your notes here…'],previous:['પાછળ','Back'],next:['આગળ','Next function'],inactiveTitle:['જરૂર હોય ત્યારે ઉમેરો.','Here if you need it.'],inactiveText:['આ વિભાગ હાલ સારાંશમાં સામેલ નથી. અગાઉની વિગતો ડ્રાફ્ટમાં સચવાયેલી રહેશે.','This section is excluded from the brief. Any earlier choices remain in your draft.'],addSection:['આ વિભાગ ઉમેરો','Include this section'],briefTitle:['તમારા પ્રસંગનો સારાંશ','Your celebration brief'],briefEyebrow:['સાથે બેસીને નક્કી કરીએ','READY TO PLAN TOGETHER'],briefText:['આ પસંદગીઓ પર ચર્ચા કરીને ડિઝાઇન, ખર્ચ અને ઉપલબ્ધતા નક્કી કરીશું. આ બુકિંગ કે કોટેશન નથી.','Use these choices to discuss designs, costs and availability together. This is a planning brief, not a booking or quotation.'],requested:['પસંદ કરેલી વસ્તુઓ','items requested'],confirmedCount:['નક્કી કરેલી વ્યવસ્થા','arrangements confirmed'],doneCount:['પૂર્ણ થયેલાં કામ','completed'],print:['પ્રિન્ટ / PDF સાચવો','Print / save PDF'],download:['સારાંશ ડાઉનલોડ કરો','Download brief'],share:['સારાંશ શેર કરો','Share brief'],edit:['બદલો','Edit'],emptyTitle:['તમારી ઉજવણી અહીંથી શરૂ થાય છે.','Your celebration starts here.'],emptyText:['કોઈ વસ્તુ પસંદ કરો અથવા પ્રસંગની વિગતો ભરો, પછી અહીં સારાંશ જુઓ.','Choose some items or add function details, then review your brief here.'],start:['મંડપ રોપણથી શરૂ કરો','Start with Mandap Ropan'],noItems:['વસ્તુઓની પસંદગી હજુ બાકી છે.','Individual items are still to be chosen.'],notIncluded:['હાલ સામેલ નથી','Not included for now'],excluded:['જરૂરી નથી એવા વિભાગો','Sections marked not needed'],clientName:['ક્લાયન્ટ / પરિવારનું નામ','Client / family name'],couple:['વર-વધૂનાં નામ','Couple’s names'],contact:['સંપર્ક વ્યક્તિ','Contact person'],phone:['મોબાઇલ નંબર','Phone number'],city:['શહેર','City'],overallBudget:['કુલ અંદાજિત બજેટ (₹)','Overall budget estimate (₹)'],preferences:['થીમ, રંગો અને ખાસ પસંદગી','Theme, colours & priorities'],vendors:['વેન્ડરના સંપર્કો અને નોંધ','Vendor contacts & notes'],vendorHelp:['પૂજારી, ફોટોગ્રાફર, ઢોલી, ડીજે, ઓર્કેસ્ટ્રા, બેન્ડ, સાફાવાળા, ટ્રાવેલ્સ, ડ્રાઇવર, હોટેલ અને અન્ય.','Priest, photographer, dhol players, DJ, orchestra, band, turban service, travel agency, driver, hotel and others.'],resetConfirm:['આ બ્રાઉઝરનો હાલનો ડ્રાફ્ટ સાફ કરીને નવા ક્લાયન્ટ માટે શરૂ કરવું છે? જરૂરી હોય તો પહેલાં ડ્રાફ્ટ ડાઉનલોડ કરો.','Clear this browser’s draft and start for a new client? Download the current draft first if you want to keep it.'],importConfirm:['સાચવેલી ફાઇલથી હાલનો ડ્રાફ્ટ બદલવો છે?','Replace the current draft with this saved file?'],importBad:['આ માન્ય ચેકલિસ્ટ ડ્રાફ્ટ નથી. યોગ્ય JSON ફાઇલ પસંદ કરો.','This is not a valid checklist draft. Choose a checklist JSON file.'],imported:['ડ્રાફ્ટ ખોલ્યો.','Draft opened.'],downloaded:['ફાઇલ ડાઉનલોડ માટે તૈયાર છે.','Your download is ready.'],shareFallback:['આ ઉપકરણ પર શેર ઉપલબ્ધ નથી. સારાંશ ડાઉનલોડ કર્યો છે.','Sharing is unavailable here. Your brief has been downloaded instead.'],shared:['શેર કરવાની પ્રક્રિયા પૂર્ણ થઈ.','Sharing completed.'],datePrepared:['સારાંશ તૈયાર કર્યાની તારીખ','Brief prepared on'],allOptional:['બધી વિગતો વૈકલ્પિક છે.','All details are optional.'],printNote:['આ સારાંશ આયોજકને આપમેળે મોકલાયો નથી.','This brief has not been automatically sent to the planner.']
  };
  const CLIENT_FIELDS = ['clientName','couple','contact','phone','date','city','overallBudget','preferences','vendors'];
  const META_FIELDS = ['date','time','guests','budget','location','notes'];
  const OWNERS = ['tbd','planner','family','venue','vendor'];
  const STATUSES = ['discuss','confirmed','done'];
  const ITEMS = new Map(DATA.flatMap(s => s.groups.flatMap(g => g.items.map(i => [i.id,i]))));
  const fresh = () => ({version:1,lang:'gu',client:{},sections:{},items:{}});
  const cleanText = (v, max=2000) => typeof v === 'string' ? v.slice(0,max) : '';
  function sanitize(raw) {
    if (!raw || typeof raw !== 'object' || raw.version !== 1 || !raw.items || typeof raw.items !== 'object' || !raw.sections || typeof raw.sections !== 'object') throw new Error('Invalid draft');
    const value = fresh();
    value.lang = raw.lang === 'en' ? 'en' : 'gu';
    for (const f of CLIENT_FIELDS) value.client[f] = cleanText(raw.client?.[f], f === 'vendors' ? 6000 : 2000);
    for (const section of DATA) {
      const old = raw.sections[section.id];
      if (!old || typeof old !== 'object') continue;
      const s = {};
      if (['considering','include','skip'].includes(old.inclusion)) s.inclusion = old.inclusion;
      for (const f of META_FIELDS) s[f] = cleanText(old[f]);
      value.sections[section.id] = s;
    }
    for (const id of ITEMS.keys()) {
      const old = raw.items[id];
      if (!old || typeof old !== 'object') continue;
      value.items[id] = {selected:old.selected === true, quantity:cleanText(old.quantity,80), owner:OWNERS.includes(old.owner) ? old.owner : 'tbd', status:STATUSES.includes(old.status) ? old.status : 'discuss', notes:cleanText(old.notes)};
    }
    return value;
  }
  let state = fresh(), storageOK = true, active = 0, reviewing = false, toastTimer;
  try { const saved = localStorage.getItem(KEY); if (saved) state = sanitize(JSON.parse(saved)); } catch (_) { storageOK = false; }
  const queryLang = new URLSearchParams(location.search).get('lang');
  if (['gu','en'].includes(queryLang)) state.lang = queryLang;
  const t = key => COPY[key]?.[state.lang === 'gu' ? 0 : 1] ?? key;
  const tr = value => value[state.lang];
  const sectionState = section => state.sections[section.id] || {};
  const inclusion = section => sectionState(section).inclusion || (section.optional ? 'skip' : 'considering');
  const selected = section => inclusion(section) === 'skip' ? [] : section.groups.flatMap(g => g.items).filter(i => state.items[i.id]?.selected);
  const allSelected = () => DATA.flatMap(selected);
  const choice = (keys,current) => keys.map(k => `<option value="${k}"${k === current ? ' selected' : ''}>${esc(t(k))}</option>`).join('');
  function save() {
    try { localStorage.setItem(KEY,JSON.stringify(state)); storageOK = true; } catch (_) { storageOK = false; }
    $('#save-status').textContent = t(storageOK ? 'saved' : 'saveFailed');
  }
  function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').hidden = false; toastTimer = setTimeout(() => { $('#toast').hidden=true; },6500); }
  function field(key,value,attrs='',type='text',wide=false,placeholder='') {
    const id = `field-${attrs.startsWith('data-client')?'client':'section'}-${key}`;
    const control = type === 'textarea' ? `<textarea id="${id}" ${attrs} maxlength="${key==='vendors' ? 6000 : 2000}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>` : `<input id="${id}" type="${type}" ${attrs} value="${esc(value)}"${type==='number'?' min="0" max="100000000000" step="1"':''} maxlength="2000">`;
    return `<label class="field${wide?' wide':''}${key==='location'?' venue':''}" for="${id}">${esc(t(key))}${control}</label>`;
  }
  function renderClient() {
    $('#client-fields').innerHTML = CLIENT_FIELDS.map(key => field(key,state.client[key],`data-client="${key}"`,key==='date'?'date':key==='phone'?'tel':['preferences','vendors'].includes(key)?'textarea':key==='overallBudget'?'number':'text',['preferences','vendors'].includes(key),key==='vendors'?t('vendorHelp'):'')).join('');
  }
  function renderNav() {
    $('#section-nav').innerHTML = DATA.map((s,index) => `<button type="button" class="section-link" data-step="${index}"${active===index&&!reviewing?' aria-current="step"':''}><span class="step-number">${String(index+1).padStart(2,'0')}</span><span class="step-label">${esc(tr(s.title))}${s.optional?`<small>${esc(t('optional'))}</small>`:''}</span>${selected(s).length?`<span class="step-count">${selected(s).length}</span>`:''}</button>`).join('');
    $('#total-counter').textContent = allSelected().length;
    $('#total-counter').setAttribute('aria-label', `${allSelected().length} ${t('requested')}`);
    if (reviewing) $('#review-nav').setAttribute('aria-current','step'); else $('#review-nav').removeAttribute('aria-current');
  }
  function renderItem(i) {
    const v = state.items[i.id] || {selected:false,owner:'tbd',status:'discuss'};
    const id = i.id;
    return `<div class="item${v.selected?' selected':''}" data-item-box="${id}"><label class="item-choice" for="check-${id}"><input type="checkbox" id="check-${id}" data-item="${id}" data-prop="selected"${v.selected?' checked':''}><span>${esc(tr(i.label))}</span></label>${i.note?`<details class="item-note"><summary>${esc(t('sourceNote'))}</summary><p>${esc(tr(i.note))}</p></details>`:''}${v.selected?`<div class="item-controls"><label class="field" for="qty-${id}">${esc(t('quantity'))}<input id="qty-${id}" data-item="${id}" data-prop="quantity" maxlength="80" value="${esc(v.quantity)}"></label><label class="field" for="owner-${id}">${esc(t('owner'))}<select id="owner-${id}" data-item="${id}" data-prop="owner">${choice(OWNERS,v.owner)}</select></label><label class="field" for="status-${id}">${esc(t('status'))}<select id="status-${id}" data-item="${id}" data-prop="status">${choice(STATUSES,v.status)}</select></label><label class="field" for="notes-${id}">${esc(t('itemNotes'))}<textarea id="notes-${id}" data-item="${id}" data-prop="notes" maxlength="2000">${esc(v.notes)}</textarea></label></div>`:''}</div>`;
  }
  function renderStep() {
    const s = DATA[active], v = sectionState(s), mode = inclusion(s);
    $('#step-content').innerHTML = `<div class="step-header"><div><span class="eyebrow">${esc(t('step'))} ${String(active+1).padStart(2,'0')} / ${String(DATA.length).padStart(2,'0')}</span><h2 id="step-title" tabindex="-1">${esc(tr(s.title))}</h2><p>${esc(tr(s.intro))}</p></div><img class="step-icon" src="assets/motifs/mandap-gate.svg" alt="" aria-hidden="true"></div><div class="function-state"><div><label for="inclusion">${esc(t('functionState'))}</label><p>${esc(t('functionHint'))}</p></div><select id="inclusion" data-section="inclusion">${choice(['considering','include','skip'],mode)}</select></div>${mode==='skip'?`<div class="inactive-panel"><h3>${esc(t('inactiveTitle'))}</h3><p>${esc(t('inactiveText'))}</p><button class="btn primary" type="button" data-action="include">${esc(t('addSection'))}</button></div>`:`<div class="section-meta"><div class="field-grid">${['date','time','guests','budget','location'].map(k=>field(k,v[k],`data-section="${k}"`,k==='date'?'date':k==='time'?'time':['guests','budget'].includes(k)?'number':'text')).join('')}</div></div><p class="hint">${esc(t('selectionHint'))}</p>${s.groups.map(g=>`<fieldset class="group"><legend>${esc(tr(g.title))}</legend><div class="items">${g.items.map(renderItem).join('')}</div></fieldset>`).join('')}<div class="section-notes"><label for="section-notes">${esc(t('sectionNotes'))}</label><textarea id="section-notes" data-section="notes" maxlength="2000" placeholder="${esc(t('notesPlaceholder'))}">${esc(v.notes)}</textarea></div>`}<div class="step-footer"><button type="button" class="btn" data-action="previous"${active===0?' disabled':''}>← ${esc(t('previous'))}</button><span class="position">${active+1} / ${DATA.length}</span><button type="button" class="btn primary" data-action="next">${esc(t(active===DATA.length-1?'review':'next'))} →</button></div>`;
  }
  function relevant(s) { const v = sectionState(s); return inclusion(s)!=='skip' && (selected(s).length || v.inclusion === 'include' || META_FIELDS.some(k=>v[k])); }
  function formattedDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value || '';
    const d = new Date(value+'T12:00:00');
    return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString(state.lang==='gu'?'gu-IN':'en-IN',{day:'numeric',month:'short',year:'numeric'});
  }
  function displayValue(key,value) { return key==='date' ? formattedDate(value) : value; }
  function metadata(s) { const v = sectionState(s); return META_FIELDS.filter(k=>k!=='notes'&&v[k]).map(k=>`${t(k)}: ${displayValue(k,v[k])}`).join(' · '); }
  function itemDetails(i) { const v = state.items[i.id]; return [v.quantity?`${t('quantity')}: ${v.quantity}`:'',`${t('owner')}: ${t(v.owner||'tbd')}`,`${t('status')}: ${t(v.status||'discuss')}`].filter(Boolean).join(' · '); }
  function briefHTML(editable=false) {
    let result = '';
    const clients = CLIENT_FIELDS.filter(k=>state.client[k]);
    if (clients.length) result += `<section class="review-section"><h3>${esc(t('clientDetails'))}</h3>${clients.map(k=>`<p class="review-meta"><strong>${esc(t(k))}:</strong> ${esc(displayValue(k,state.client[k]))}</p>`).join('')}</section>`;
    DATA.forEach((s,index) => {
      if (!relevant(s)) return;
      const list = selected(s), v = sectionState(s);
      result += `<section class="review-section">${editable?`<button type="button" class="edit-link" data-step="${index}">${esc(t('edit'))}</button>`:''}<h3>${esc(tr(s.title))}</h3><p class="review-meta">${esc(t(inclusion(s)))}</p>${metadata(s)?`<p class="review-meta">${esc(metadata(s))}</p>`:''}${list.length?`<ul>${list.map(i=>`<li><strong>${esc(tr(i.label))}</strong><small>${esc(itemDetails(i))}</small>${state.items[i.id].notes?`<small>${esc(state.items[i.id].notes)}</small>`:''}${i.note?`<small>${esc(t('sourceNote'))}: ${esc(tr(i.note))}</small>`:''}</li>`).join('')}</ul>`:`<p class="review-meta">${esc(t('noItems'))}</p>`}${v.notes?`<p class="review-note">${esc(v.notes)}</p>`:''}</section>`;
    });
    const skipped = DATA.filter(s=>inclusion(s)==='skip');
    if (skipped.length) result += `<section class="review-section"><h3>${esc(t('excluded'))}</h3><p class="review-meta">${esc(skipped.map(s=>tr(s.title)).join(' · '))}</p></section>`;
    return result;
  }
  function briefText() {
    const lines = ['J.VARDHAN | '+t('briefTitle'),`${t('datePrepared')}: ${new Date().toLocaleDateString(state.lang==='gu'?'gu-IN':'en-IN')}`,t('briefText'),''];
    CLIENT_FIELDS.filter(k=>state.client[k]).forEach(k=>lines.push(`${t(k)}: ${displayValue(k,state.client[k])}`));
    DATA.forEach(s=>{
      if (!relevant(s)) return;
      lines.push('',tr(s.title).toUpperCase(),t(inclusion(s)),metadata(s));
      const list = selected(s);
      if (!list.length) lines.push(t('noItems'));
      list.forEach(i=>{lines.push(`• ${tr(i.label)}`,`  ${itemDetails(i)}`);if(state.items[i.id].notes)lines.push(`  ${state.items[i.id].notes}`);if(i.note)lines.push(`  ${t('sourceNote')}: ${tr(i.note)}`);});
      if (sectionState(s).notes) lines.push(sectionState(s).notes);
    });
    lines.push('',t('excluded')+': '+DATA.filter(s=>inclusion(s)==='skip').map(s=>tr(s.title)).join(', '),'',t('printNote'));
    return lines.join('\n');
  }
  function printHTML() { return `<p class="eyebrow">J.VARDHAN · LUXE WEDDINGS &amp; EVENTS</p><h1>${esc(t('briefTitle'))}</h1><p>${esc(t('datePrepared'))}: ${esc(new Date().toLocaleDateString(state.lang==='gu'?'gu-IN':'en-IN'))}<br>${esc(t('briefText'))}<br>${esc(t('printNote'))}</p>${briefHTML()}`; }
  function renderReview() {
    const list = allSelected(), counts = [list.length,list.filter(i=>state.items[i.id].status==='confirmed').length,list.filter(i=>state.items[i.id].status==='done').length];
    const hasContent = list.length || DATA.some(relevant) || CLIENT_FIELDS.some(k=>state.client[k]);
    $('#step-content').innerHTML = `<div class="review-intro"><span class="eyebrow">${esc(t('briefEyebrow'))}</span><h2 id="step-title" tabindex="-1">${esc(t('briefTitle'))}</h2><p>${esc(t('briefText'))}</p><div class="review-stats">${['requested','confirmedCount','doneCount'].map((k,i)=>`<div><strong>${counts[i]}</strong><span>${esc(t(k))}</span></div>`).join('')}</div><div class="button-row"><button type="button" class="btn gold" data-action="print">${esc(t('print'))}</button><button type="button" class="btn gold" data-action="download">${esc(t('download'))}</button><button type="button" class="btn gold" data-action="share">${esc(t('share'))}</button></div></div>${hasContent?briefHTML(true):`<div class="review-empty"><h3>${esc(t('emptyTitle'))}</h3><p>${esc(t('emptyText'))}</p><button type="button" class="btn primary" data-step="0">${esc(t('start'))}</button></div>`}`;
    $('#print-content').innerHTML = printHTML();
  }
  function renderAll() {
    document.documentElement.lang = state.lang;
    document.title = state.lang==='gu'?'લગ્ન આયોજન ચેકલિસ્ટ | J.Vardhan':'Wedding Planning Checklist | J.Vardhan';
    document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t);});
    document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===state.lang)));
    $('#deck-download').href = `assets/decks/JVARDHAN-Wedding-Checklist-${state.lang==='gu'?'Gujarati':'English'}.pptx`;
    renderClient(); renderNav(); reviewing?renderReview():renderStep(); save();
  }
  function navigate(index,isReview=false) {
    active = Math.max(0,Math.min(DATA.length-1,index)); reviewing = isReview;
    renderNav(); reviewing?renderReview():renderStep();
    $('#workspace').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    $('#step-title').focus({preventScroll:true});
  }
  function download(content,filename,type) {
    const url = URL.createObjectURL(new Blob([content],{type}));
    const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  function downloadBrief() { download('\uFEFF'+briefText(),`J-Vardhan-client-brief-${state.lang}.txt`,'text/plain;charset=utf-8'); }
  function updateInput(el) {
    if (el.dataset.client) {
      state.client[el.dataset.client] = el.value; save();
      if(reviewing)renderReview();
    }
    if (el.dataset.section) {
      const id=DATA[active].id, key=el.dataset.section;
      state.sections[id] ||= {};
      state.sections[id][key] = el.value;
      save();
      if(key==='inclusion'){renderStep();renderNav();$('#inclusion').focus();}
    }
    if (el.dataset.item) {
      const id=el.dataset.item, key=el.dataset.prop;
      state.items[id] ||= {selected:false,owner:'tbd',status:'discuss',quantity:'',notes:''};
      state.items[id][key] = key==='selected'?el.checked:el.value;
      save();
      if(key==='selected') { const box=document.querySelector(`[data-item-box="${id}"]`);box.outerHTML=renderItem(ITEMS.get(id));renderNav();$(`#check-${id}`).focus({preventScroll:true}); }
    }
  }
  document.addEventListener('input',e=>{if(!['checkbox','select-one','file'].includes(e.target.type))updateInput(e.target);});
  document.addEventListener('change',e=>{
    if(['checkbox','select-one'].includes(e.target.type))updateInput(e.target);
    if(e.target.type==='number' && e.target.value && !e.target.validity.valid){e.target.value=String(Math.min(100000000000,Math.max(0,Math.round(Number(e.target.value)||0))));updateInput(e.target);}
  });
  document.addEventListener('click',async e=>{
    const lang=e.target.closest('[data-lang]');
    if(lang){state.lang=lang.dataset.lang;renderAll();return;}
    const step=e.target.closest('[data-step]');if(step){navigate(Number(step.dataset.step));return;}
    const action=e.target.closest('[data-action]')?.dataset.action;if(!action)return;
    if(action==='previous')navigate(active-1);
    if(action==='next')navigate(active+1,active===DATA.length-1);
    if(action==='include'){state.sections[DATA[active].id]||={};state.sections[DATA[active].id].inclusion='include';save();renderStep();renderNav();}
    if(action==='print'){$('#print-content').innerHTML=printHTML();await document.fonts.ready;window.print();}
    if(action==='download'){downloadBrief();toast(t('downloaded'));}
    if(action==='export'){download(JSON.stringify(state,null,2),'J-Vardhan-checklist-draft.json','application/json');toast(t('downloaded'));}
    if(action==='import')$('#import-file').click();
    if(action==='reset'&&confirm(t('resetConfirm'))){const lang=state.lang;state=fresh();state.lang=lang;active=0;reviewing=false;$('#client-details').open=false;renderAll();}
    if(action==='share'){
      try{
        const text=briefText();
        const file=new File(['\uFEFF'+text],`J-Vardhan-client-brief-${state.lang}.txt`,{type:'text/plain'});
        if(navigator.canShare?.({files:[file]}))await navigator.share({title:t('briefTitle'),files:[file]});
        else if(navigator.share)await navigator.share({title:t('briefTitle'),text});
        else{downloadBrief();toast(t('shareFallback'));return;}
        toast(t('shared'));
      }catch(error){if(error.name!=='AbortError'){downloadBrief();toast(t('shareFallback'));}}
    }
  });
  $('#review-nav').addEventListener('click',()=>navigate(active,true));
  $('#import-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    try{
      if(file.size>1000000)throw new Error('Oversized');
      const imported=sanitize(JSON.parse(await file.text()));
      if(confirm(t('importConfirm'))){state=imported;active=0;reviewing=false;renderAll();toast(t('imported'));}
    }catch(_){toast(t('importBad'));}finally{e.target.value='';}
  });
  window.addEventListener('beforeprint',()=>{$('#print-content').innerHTML=printHTML();});
  renderAll();
})();
