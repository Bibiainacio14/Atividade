(function(){
  document.getElementById('year')?.textContent = new Date().getFullYear();

  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  menuToggle?.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    if(mainNav) mainNav.classList.toggle('open');
  });

  const themeToggle = document.getElementById('theme-toggle');
  const contrastToggle = document.getElementById('contrast-toggle');
  const root = document.documentElement;

  function applyTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }
  function applyContrast(v){
    root.setAttribute('data-contrast', v? 'high': 'normal');
    localStorage.setItem('contrast', v? 'high':'normal');
  }
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  const savedContrast = localStorage.getItem('contrast') === 'high';
  applyContrast(savedContrast);

  themeToggle?.addEventListener('click', ()=>{
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    themeToggle.setAttribute('aria-pressed', String(next==='dark'));
  });
  contrastToggle?.addEventListener('click', ()=>{
    const current = root.getAttribute('data-contrast') === 'high';
    applyContrast(!current);
    contrastToggle.setAttribute('aria-pressed', String(!current));
  });

  window.showToast = function(msg, timeout=3500){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'), timeout);
  }

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      menuToggle?.setAttribute('aria-expanded','false');
      mainNav?.classList.remove('open');
    }
  });
})();
