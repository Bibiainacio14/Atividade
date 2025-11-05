(function(){
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href) return;
    if(href.startsWith('http') || href.startsWith('#')) return;
    // SPA placeholder: can fetch and inject content via fetch() then parse into main.
  });
})();
