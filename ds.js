/* J.Vardhan: progressive interactions, natural scrolling and reduced-motion support. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = 'cubic-bezier(.22,.8,.3,1)';
  const read = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  function setTheme(theme) {
    const dark = theme === 'dusk';
    if (dark) root.setAttribute('data-theme','dusk'); else root.removeAttribute('data-theme');
    document.querySelectorAll('.theme-switch [data-theme]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.theme === (dark?'dusk':'day'))));
    document.getElementById('btnDay')?.setAttribute('aria-pressed',String(!dark));
    document.getElementById('btnDusk')?.setAttribute('aria-pressed',String(dark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#06403C':'#F7F2E7');
    try { localStorage.setItem('jv-theme',dark?'dusk':'day'); } catch (_) {}
  }
  window.jvSetTheme = setTheme;
  setTheme(read('jv-theme') === 'dusk' ? 'dusk' : 'day');
  function animate(el, frames, options={}) {
    if (el && !motion.matches && el.animate) return el.animate(frames,{duration:700,easing:ease,...options});
  }
  function download(text,name,type='text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([text],{type}));
    const link = document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  function init() {
    root.classList.add('js');
    document.querySelectorAll('#loader,#veil').forEach(el=>el.remove());
    document.querySelectorAll('.theme-switch [data-theme]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.theme)));
    document.getElementById('btnDay')?.addEventListener('click',()=>setTheme('day'));
    document.getElementById('btnDusk')?.addEventListener('click',()=>setTheme('dusk'));
    setTheme(read('jv-theme') === 'dusk' ? 'dusk' : 'day');
    if (!document.body.classList.contains('experience')) return;
    setupMenu();setupMotion();setupScenes();setupCeremonies();setupGallery();setupContact();
  }
  function setupMenu() {
    const header=document.querySelector('.main-nav'), menu=document.getElementById('main-menu');
    const toggle=document.querySelector('.menu-toggle'), scrim=document.querySelector('.menu-scrim');
    const mobile=matchMedia('(max-width:980px)');
    let opened=false;
    function setOpen(open,returnFocus=false) {
      opened=mobile.matches&&open;
      menu.hidden=mobile.matches&&!opened;
      toggle.setAttribute('aria-expanded',String(opened));
      toggle.setAttribute('aria-label',opened?'Close menu':'Open menu');
      document.body.classList.toggle('menu-open',opened);
      scrim.hidden=!opened;
      document.querySelector('main').inert=opened;
      document.querySelector('.event-footer').inert=opened;
      if (returnFocus) toggle.focus();
    }
    setOpen(false);
    toggle.addEventListener('click',()=>setOpen(!opened));
    scrim.addEventListener('click',()=>setOpen(false,true));
    menu.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false);});
    document.addEventListener('keydown',e=>{
      if (!opened) return;
      if(e.key==='Escape'){e.preventDefault();setOpen(false,true);}
      if(e.key==='Tab'){
        const focusable=[...header.querySelectorAll('a,button')].filter(el=>el.getClientRects().length);
        const first=focusable[0],last=focusable.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    mobile.addEventListener('change',()=>setOpen(false));
    window.addEventListener('pageshow',()=>setOpen(false));
  }
  function setupMotion() {
    const elements=[...document.querySelectorAll('.reveal')];
    const seen=new WeakSet();
    const observer='IntersectionObserver' in window ? new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting||seen.has(entry.target))return;
        seen.add(entry.target);observer.unobserve(entry.target);
        const base=getComputedStyle(entry.target).transform;
        animate(entry.target,[{opacity:0,transform:'translateY(24px) '+(base==='none'?'':base)},{opacity:1,transform:base}],{duration:850});
      });
    },{threshold:.08,rootMargin:'0px 0px -18px 0px'}):null;
    function observe(){if(!motion.matches&&observer)elements.forEach(el=>{if(!seen.has(el))observer.observe(el);});}
    observe();
    document.querySelectorAll('.hero-enter').forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:900,delay:i*90,fill:'backwards'}));
    animate(document.querySelector('.hero-arch'),[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:1150});
    document.querySelectorAll('details').forEach(details=>details.addEventListener('toggle',()=>{
      if(details.open){const detail=details.querySelector('.service-detail,p');animate(detail,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:380});}
    }));
    const header=document.querySelector('.main-nav'),hero=document.querySelector('.editorial-hero');
    let scheduled=false;
    function paint(){
      scheduled=false;
      const max=document.documentElement.scrollHeight-innerHeight;
      root.style.setProperty('--reading-progress',String(max>0?Math.min(1,Math.max(0,scrollY/max)):0));
      header.classList.toggle('scrolled',scrollY>15);
      if(hero){const rect=hero.getBoundingClientRect();const y=!motion.matches&&innerWidth>980&&rect.bottom>0?Math.max(-20,Math.min(0,rect.top*.035)):0;hero.style.setProperty('--image-depth',y+'px');}
    }
    function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(paint);}}
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});paint();
    motion.addEventListener('change',()=>{
      if(motion.matches){observer?.disconnect();document.getAnimations().forEach(a=>a.cancel());}
      else observe();
      paint();
    });
  }
  function setupScenes(){
    const controls=document.querySelector('.hero-scene-controls');if(!controls)return;
    controls.hidden=false;
    const image=document.querySelector('.hero-scene-image');
    controls.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
      if(button.getAttribute('aria-pressed')==='true')return;
      controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      image.src=button.dataset.src;image.alt=button.dataset.alt;
      document.getElementById('hero-scene-caption').textContent=button.dataset.caption;
      document.getElementById('hero-scene-number').textContent=String(Number(button.dataset.scene)+1).padStart(2,'0')+' / 03';
      animate(image,[{opacity:.15},{opacity:1}],{duration:700});
    }));
  }
  function setupCeremonies(){
    document.querySelectorAll('.ceremony-explorer').forEach(explorer=>{
      const tabs=[...explorer.querySelectorAll('[role=tab]')],panels=[...explorer.querySelectorAll('[role=tabpanel]')];
      explorer.querySelector('[role=tablist]').hidden=false;
      function select(index,focus=false){
        tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
        if(focus)tabs[index].focus();
        animate(panels[index],[{opacity:.25,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:500});
      }
      panels.forEach((p,i)=>p.hidden=i!==0);
      tabs.forEach((tab,i)=>{
        tab.addEventListener('click',()=>select(i));
        tab.addEventListener('keydown',e=>{
          let next=null;
          if(e.key==='ArrowRight')next=(i+1)%tabs.length;
          if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
          if(e.key==='Home')next=0;
          if(e.key==='End')next=tabs.length-1;
          if(next!==null){e.preventDefault();select(next,true);}
        });
      });
    });
  }
  function setupGallery(){
    const grid=document.getElementById('gallery-grid');if(!grid||!window.JV_GALLERY)return;
    const data=window.JV_GALLERY;
    const categories={all:'All moments',mandaps:'Mandaps & weddings',haldi:'Haldi',sangeet:'Sangeet & evenings',stages:'Stages',traditions:'Traditions',florals:'Floral details',entrances:'Entrances'};
    const filters=document.querySelector('.gallery-filters'),pagination=document.querySelector('.gallery-pages');
    filters.hidden=false;
    let category='all',pageNumber=1,filtered=data,currentIndex=0,returnFocus=null;
    const dialog=document.createElement('dialog');dialog.className='gallery-dialog';dialog.setAttribute('aria-label','Portfolio photograph');
    dialog.innerHTML='<button type="button" class="dialog-close" aria-label="Close photograph">×</button><button type="button" class="dialog-prev" aria-label="Previous photograph">←</button><figure><img alt=""><figcaption class="dialog-caption"><span class="dialog-description"></span><span class="dialog-count"></span></figcaption></figure><button type="button" class="dialog-next" aria-label="Next photograph">→</button>';
    document.body.appendChild(dialog);
    function query(){
      const params=new URLSearchParams(location.search);
      category=Object.hasOwn(categories,params.get('category'))?params.get('category'):'all';
      const pathPage=location.pathname.match(/portfolio-(\d+)\.html$/)?.[1]||'1';
      pageNumber=Math.max(1,parseInt(params.get('page')||pathPage,10)||1);
    }
    function card(item){
      const figure=document.createElement('figure');figure.className='gallery-card';
      const a=document.createElement('a');a.className='gallery-open';a.href=item.src;a.dataset.galleryId=item.id;a.setAttribute('aria-label','View '+item.alt);
      const img=document.createElement('img');img.src=item.src;img.alt=item.alt;img.width=1200;img.height=900;img.loading='lazy';img.decoding='async';
      const icon=document.createElement('span');icon.className='gallery-enlarge';icon.setAttribute('aria-hidden','true');icon.textContent='↗';a.append(img,icon);
      const caption=document.createElement('figcaption'),label=document.createElement('span'),text=document.createElement('p');label.className='eyebrow';label.textContent=categories[item.category];text.textContent=item.alt;caption.append(label,text);figure.append(a,caption);return figure;
    }
    function pageURL(number){return (location.pathname.split('/').pop()||'portfolio.html')+'?category='+encodeURIComponent(category)+'&page='+number;}
    function render(updateURL=false){
      filtered=category==='all'?data:data.filter(i=>i.category===category);
      const pages=Math.max(1,Math.ceil(filtered.length/12));pageNumber=Math.min(pageNumber,pages);
      if(updateURL)history.pushState({},'',pageURL(pageNumber));
      filters.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
      grid.replaceChildren(...filtered.slice((pageNumber-1)*12,pageNumber*12).map(card));
      document.getElementById('gallery-count').textContent=`Showing ${(pageNumber-1)*12+1}–${Math.min(pageNumber*12,filtered.length)} of ${filtered.length} photographs`;
      pagination.replaceChildren();
      for(let i=1;i<=pages;i++){
        const el=document.createElement(i===pageNumber?'span':'a');el.textContent=i;
        if(i===pageNumber)el.setAttribute('aria-current','page');else{el.href=pageURL(i);el.dataset.galleryPage=i;el.setAttribute('aria-label','Portfolio page '+i);}
        pagination.append(el);
      }
    }
    filters.addEventListener('click',e=>{const button=e.target.closest('[data-category]');if(!button)return;category=button.dataset.category;pageNumber=1;render(true);animate(grid,[{opacity:.3},{opacity:1}],{duration:350});});
    pagination.addEventListener('click',e=>{const a=e.target.closest('[data-gallery-page]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0)return;e.preventDefault();pageNumber=Number(a.dataset.galleryPage);render(true);document.querySelector('.gallery-meta').scrollIntoView({block:'center',behavior:motion.matches?'instant':'smooth'});grid.querySelector('a')?.focus({preventScroll:true});});
    window.addEventListener('popstate',()=>{query();render();});
    function show(index){
      currentIndex=(index+filtered.length)%filtered.length;
      const item=filtered[currentIndex],img=dialog.querySelector('img');img.src=item.src;img.alt=item.alt;
      dialog.querySelector('.dialog-description').textContent=item.alt;
      dialog.querySelector('.dialog-count').textContent=(currentIndex+1)+' / '+filtered.length;
      animate(img,[{opacity:.2},{opacity:1}],{duration:350});
    }
    grid.addEventListener('click',e=>{
      const a=e.target.closest('[data-gallery-id]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button!==0||!dialog.showModal)return;
      e.preventDefault();returnFocus=a;show(filtered.findIndex(i=>i.id===a.dataset.galleryId));dialog.showModal();document.body.classList.add('gallery-viewing');dialog.querySelector('.dialog-close').focus();
    });
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.querySelector('.dialog-prev').addEventListener('click',()=>show(currentIndex-1));
    dialog.querySelector('.dialog-next').addEventListener('click',()=>show(currentIndex+1));
    dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(currentIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();show(currentIndex+1);}});
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{document.body.classList.remove('gallery-viewing');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
    query();render();
  }
  function setupContact(){
    const config=window.JV_SITE||{};
    const validNumber=value=>{const n=String(value||'').replace(/[^0-9]/g,'');return /^[1-9][0-9]{9,14}$/.test(n)&&!/^\d{1,3}0{9,}$/.test(n)?n:'';};
    const phone=validNumber(config.phone),whatsapp=validNumber(config.whatsapp);
    const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email||'')?config.email:'';
    document.querySelectorAll('[data-contact-links]').forEach(container=>{
      const links=[];
      if(phone)links.push(['tel:+'+phone,'+'+phone]);
      if(whatsapp)links.push(['https://wa.me/'+whatsapp,'WhatsApp ↗']);
      if(email)links.push(['mailto:'+email,email]);
      links.forEach(([href,label])=>{const a=document.createElement('a');a.href=href;a.textContent=label;if(href.startsWith('https'))a.rel='noopener';container.append(a);});
    });
    document.querySelectorAll('[data-contact-card]').forEach(card=>card.hidden=!(phone||whatsapp||email||config.address));
    document.querySelectorAll('[data-contact-address]').forEach(el=>el.textContent=config.address||'');
    const form=document.getElementById('enquiry-form');let text='';
    if(form){
      form.querySelector('button[type=submit]').disabled=false;
      if(new URLSearchParams(location.search).get('type')==='venue')form.elements.type.value='venue';
      form.addEventListener('submit',e=>{
        e.preventDefault();if(!form.reportValidity())return;
        const values=new FormData(form);
        const lines=['J.VARDHAN | ENQUIRY BRIEF','Name: '+values.get('name'),'Planning: '+form.elements.type.selectedOptions[0].textContent];
        const fields={location:'City / venue',date:'Approximate date',guests:'Expected guests',budget:'Budget preference',phone:'Phone',email:'Email',message:'Details & priorities'};
        Object.entries(fields).forEach(([key,label])=>{const value=String(values.get(key)||'').trim();if(value)lines.push(label+': '+value);});
        text=lines.join('\n');document.getElementById('enquiry-preview').textContent=text;
        const result=document.getElementById('enquiry-result');result.hidden=false;
        const wa=document.getElementById('enquiry-whatsapp');wa.hidden=!whatsapp;if(whatsapp)wa.href='https://wa.me/'+whatsapp+'?text='+encodeURIComponent(text);
        document.getElementById('enquiry-status').textContent='Your details are ready. Choose a sharing option to send them.';
        document.getElementById('brief-heading').focus();result.scrollIntoView({block:'center',behavior:motion.matches?'instant':'smooth'});
      });
      document.querySelectorAll('[data-enquiry-action]').forEach(button=>button.addEventListener('click',async()=>{
        const status=document.getElementById('enquiry-status');
        if(button.dataset.enquiryAction==='download'){download(text,'J-Vardhan-enquiry.txt');status.textContent='Your enquiry download is ready. Share the file with your planner.';}
        if(button.dataset.enquiryAction==='copy'){
          try{await navigator.clipboard.writeText(text);status.textContent='Copied. You can paste the details into your message.';}catch(_){status.textContent='Copy is unavailable here. Use Download to save your brief.';}
        }
        if(button.dataset.enquiryAction==='share'){
          try{if(navigator.share){await navigator.share({title:'J.Vardhan enquiry',text});status.textContent='Sharing completed.';}else{download(text,'J-Vardhan-enquiry.txt');status.textContent='Sharing is unavailable in this browser. Your brief has been downloaded instead.';}}
          catch(error){if(error.name!=='AbortError'){download(text,'J-Vardhan-enquiry.txt');status.textContent='Your brief has been downloaded so you can share it.';}}
        }
      }));
    }
    document.querySelector('[data-share-site]')?.addEventListener('click',async()=>{
      const status=document.querySelector('[data-share-status]'),url=config.url||'https://mihirzalavadia.github.io/jvardhan-site/';
      try{if(navigator.share){await navigator.share({title:'J.Vardhan — Weddings & Events',url});status.textContent='Sharing completed.';}else{await navigator.clipboard.writeText(url);status.textContent='Website link copied.';}}
      catch(error){if(error.name!=='AbortError'){download(url,'J-Vardhan-website.txt');status.textContent='Website link downloaded for sharing.';}}
    });
  }
  if(document.readyState==='complete')init();else document.addEventListener('DOMContentLoaded',init,{once:true});
})();
