// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Captura os valores dos inputs
        const email = document.getElementById('e-mail').value;
        const senha = document.getElementById('senha').value;

        // Validação básica
        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        console.log("Tentativa de login com:", email);
        
        if (email === "usuario@teste.com" && senha === "123456") {
            alert("Login realizado com sucesso!");
        } else {
            alert("E-mail ou senha incorretos.");
        }
    });
});
