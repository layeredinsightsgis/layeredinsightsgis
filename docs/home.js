// Homepage: problem tabs, before/after slider, "connect them" demo.
(function(){
  const r=document.getElementById('ba-range'), b=document.getElementById('ba');
  const set=()=>b.style.setProperty('--pos', r.value+'%'); r.addEventListener('input', set); set();
  const tabs=[...document.querySelectorAll('.pk-tabs [data-tab]')];
  function open(name){ tabs.forEach(t=>{ const on=t.dataset.tab===name; t.setAttribute('aria-selected', on); document.getElementById('pane-'+t.dataset.tab).hidden=!on; }); }
  tabs.forEach(t=>t.addEventListener('click',()=>open(t.dataset.tab)));
  document.querySelectorAll('[data-open]').forEach(a=>a.addEventListener('click',()=>open(a.dataset.open)));
  const go=document.getElementById('sy-go'), cnt=document.getElementById('sy-count');
  go.addEventListener('click',()=>{
    const vs=[...document.querySelectorAll('.sy-v')];
    if (go.dataset.done) { vs.forEach(v=>{ v.textContent=v.dataset.bad; v.classList.remove('ok'); }); cnt.textContent='4 mismatches'; cnt.classList.remove('ok'); go.textContent='Connect them'; delete go.dataset.done; return; }
    vs.forEach((v,i)=>setTimeout(()=>{ v.dataset.bad=v.textContent; v.textContent=v.dataset.good; v.classList.add('ok'); },250*i));
    setTimeout(()=>{ cnt.textContent='All in step. Kept that way automatically.'; cnt.classList.add('ok'); go.textContent='Show the mess again'; go.dataset.done='1'; },250*vs.length+100);
  });
})();


// "Ways in" boxes: the one you click (or tab into) takes the highlight.
(function () {
  var cards = document.querySelectorAll('#ways .step-card');
  function pick(card) {
    cards.forEach(function (c) { c.classList.toggle('is-on', c === card); });
  }
  cards.forEach(function (card) {
    card.addEventListener('click', function () { pick(card); });
    card.addEventListener('focusin', function () { pick(card); });
  });
})();
