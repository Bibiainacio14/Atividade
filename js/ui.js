(function(){
  window.openModal = function(title, content){
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class="modal-inner" role="dialog" aria-modal="true"><h2>${title}</h2><div>${content}</div><button class="btn" data-close>Fechar</button></div>`;
    document.body.appendChild(modal);
    modal.querySelector('[data-close]')?.addEventListener('click', ()=>modal.remove());
  }
})();
