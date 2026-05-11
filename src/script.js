// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (event) => {
        // Impede o formulário de recarregar a página (comportamento padrão)
        event.preventDefault();

        // Captura os valores dos inputs
        const email = document.getElementById('e-mail').value;
        const senha = document.getElementById('senha').value;

        // Validação básica
        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Simulação de login
        console.log("Tentativa de login com:", email);
        
        if (email === "usuario@teste.com" && senha === "123456") {
            alert("Login realizado com sucesso!");
            // Aqui você poderia redirecionar o usuário:
            // window.location.href = "dashboard.html";
        } else {
            alert("E-mail ou senha incorretos.");
        }
    });
});