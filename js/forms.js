\
    (function(){
      const form = document.getElementById('cadastro-form');
      if(!form) return;

      function maskCPF(v){
        return v.replace(/\D/g,'')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d)/,'$1.$2')
          .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      }
      function maskTel(v){
        v = v.replace(/\D/g,'');
        if(v.length>10) return v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
        return v.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');
      }
      function maskCEP(v){
        return v.replace(/\D/g,'').replace(/(\d{5})(\d{1,3})/,'$1-$2');
      }

      const cpfEl = document.getElementById('cpf');
      const telEl = document.getElementById('telefone');
      const cepEl = document.getElementById('cep');

      cpfEl?.addEventListener('input', e=>e.target.value = maskCPF(e.target.value));
      telEl?.addEventListener('input', e=>e.target.value = maskTel(e.target.value));
      cepEl?.addEventListener('input', e=>e.target.value = maskCEP(e.target.value));

      const STORAGE_KEY = 'cadastro-temp';
      form.addEventListener('input', ()=>{
        const data = Object.fromEntries(new FormData(form));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      });
      const saved = localStorage.getItem(STORAGE_KEY);
      if(saved){
        const obj = JSON.parse(saved);
        for(const k in obj){
          const el = form.elements[k]; if(el) el.value = obj[k];
        }
      }

      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(!form.checkValidity()){
          showToast('Por favor, preencha corretamente os campos obrigatórios.');
          form.reportValidity();
          return;
        }
        const nasc = new Date(form.nascimento.value);
        const age = new Date().getFullYear() - nasc.getFullYear();
        if(age < 16){
          showToast('É necessário ter no mínimo 16 anos para se cadastrar.');
          return;
        }

        const data = Object.fromEntries(new FormData(form));
        const registros = JSON.parse(localStorage.getItem('cadastros')||'[]');
        registros.push({...data, createdAt: new Date().toISOString()});
        localStorage.setItem('cadastros', JSON.stringify(registros));
        localStorage.removeItem(STORAGE_KEY);
        form.reset();
        showToast('Cadastro enviado com sucesso!');
      });
    })();
