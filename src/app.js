document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const gastoForm = document.getElementById('gastoForm');
    const editForm = document.getElementById('editGastoForm');

    // =====================================
    // 1. TELA DE LOGIN
    // =====================================
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const senha = document.getElementById('login-senha').value;

            if (!email || !senha) {
                alert("Preencha e-mail e senha.");
                return;
            }

            const dbUser = JSON.parse(localStorage.getItem('dbuser'));
            
            // Aceita usuário cadastrado OU o usuário mestre de teste
            if ((dbUser && email === dbUser.email && senha === dbUser.senha) || (email === "caio123@gmail.com" && senha === "123456")) {
                window.location.href = 'gastos.html';
            } else {
                alert("Credenciais inválidas. Verifique seu e-mail e senha.");
            }
        });
    }

    // =====================================
    // 2. TELA DE CADASTRO
    // =====================================
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('cad-nome').value.trim();
            const email = document.getElementById('cad-email').value.trim();
            const senha = document.getElementById('cad-senha').value;

            if (!nome || !email || !senha) {
                alert("Todos os campos do cadastro são obrigatórios.");
                return;
            }

            localStorage.setItem('dbuser', JSON.stringify({ nome, email, senha }));
            alert("Cadastro realizado com sucesso! Você já pode fazer login.");
            window.location.href = 'index.html';
        });
    }

    // =====================================
    // 3. TELA DE GASTOS (DASHBOARD)
    // =====================================
    if (gastoForm) {
        const valIn = document.getElementById('gasto-valor');
        const dataIn = document.getElementById('gasto-data');
        const editValIn = document.getElementById('edit-gasto-valor');
        const editDataIn = document.getElementById('edit-gasto-data');
        const indexIn = document.getElementById('gasto-index');
        const modal = document.getElementById('editModal');
        
        let lancamentos = JSON.parse(localStorage.getItem('dbgastos')) || [];

        // Define a data de hoje por padrão
        const setHoje = (input) => { 
            const h = new Date(); 
            input.value = `${String(h.getDate()).padStart(2,'0')}/${String(h.getMonth()+1).padStart(2,'0')}/${h.getFullYear()}`; 
        };
        setHoje(dataIn); 
        render();

        // Sistema de Máscaras Automáticas
        function mask(v, d) {
            v.addEventListener('input', function() { 
                let n = this.value.replace(/\D/g,''); 
                if(!n){this.value=''; return;} 
                n = (parseInt(n,10)/100).toFixed(2); 
                this.value = 'R$ ' + n.replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.'); 
            });
            d.addEventListener('input', function() { 
                let n = this.value.replace(/\D/g,''); 
                if(n.length>2) n = n.slice(0,2)+'/'+n.slice(2); 
                if(n.length>5) n = n.slice(0,5)+'/'+n.slice(5); 
                this.value = n.slice(0,10); 
            });
        }
        mask(valIn, dataIn); 
        mask(editValIn, editDataIn);

        // Ação de Criar Novo Gasto
        gastoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const desc = document.getElementById('gasto-desc').value.trim();
            const valor = valIn.value;
            const data = dataIn.value;

            if(!desc || !valor || data.length < 10) { 
                alert("Preencha a descrição, valor e data corretamente."); 
                return; 
            }

            lancamentos.unshift({ desc, valor, data });
            localStorage.setItem('dbgastos', JSON.stringify(lancamentos));
            
            // Limpa o form após salvar
            document.getElementById('gasto-desc').value = ''; 
            valIn.value = ''; 
            setHoje(dataIn); 
            render();
        });

        // Ação de Salvar a Edição no Pop-up Modal
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const idx = parseInt(indexIn.value);
            lancamentos[idx] = { 
                desc: document.getElementById('edit-gasto-desc').value.trim(), 
                valor: editValIn.value, 
                data: editDataIn.value 
            };
            localStorage.setItem('dbgastos', JSON.stringify(lancamentos));
            modal.classList.remove('active'); 
            render();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => modal.classList.remove('active'));

        // Função que renderiza a lista na esquerda
        function render() {
            const list = document.getElementById('tx-list'); 
            list.innerHTML = '';
            
            if (lancamentos.length === 0) { 
                list.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:40px 0; font-size:12px; font-family:'Space Mono';">Nenhum gasto registrado.</div>`; 
                return; 
            }

            lancamentos.forEach((tx, i) => {
                const item = document.createElement('div'); 
                item.className = 'tx-item';
                item.innerHTML = `
                    <div class="tx-info">
                        <span class="tx-tag">Gst</span>
                        <span class="tx-name">${tx.desc}</span>
                    </div>
                    <span class="tx-date">${tx.data}</span>
                    <div class="tx-actions">
                        <span class="tx-amount">- ${tx.valor}</span>
                        <button class="btn-action btn-edit" data-id="${i}"><i class="fas fa-edit"></i></button>
                        <button class="btn-action btn-delete" data-id="${i}"><i class="fas fa-trash"></i></button>
                    </div>`;
                list.appendChild(item);
            });

            // Ativa botões de apagar
            document.querySelectorAll('.btn-delete').forEach(b => b.addEventListener('click', function() { 
                if(confirm("Deseja mesmo apagar este gasto?")) { 
                    lancamentos.splice(parseInt(this.getAttribute('data-id')), 1); 
                    localStorage.setItem('dbgastos', JSON.stringify(lancamentos)); 
                    render(); 
                } 
            }));

            // Ativa botões de editar e abrir modal
            document.querySelectorAll('.btn-edit').forEach(b => b.addEventListener('click', function() { 
                const idx = parseInt(this.getAttribute('data-id')); 
                const item = lancamentos[idx]; 
                
                document.getElementById('edit-gasto-desc').value = item.desc; 
                editValIn.value = item.valor; 
                editDataIn.value = item.data; 
                indexIn.value = idx; 
                
                modal.classList.add('active'); 
            }));
        }
    }

    // Logout
    if(document.getElementById('logoutBtn')) { 
        document.getElementById('logoutBtn').addEventListener('click', () => { 
            if(confirm("Sair do painel?")) window.location.href = 'index.html'; 
        }); 
    }
});