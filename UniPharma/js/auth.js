document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();

        // Simulação de login (você pode trocar por validação real depois)
        if (usuario === 'admin' && senha === '1234') {
            alert('Login bem-sucedido! 👑');
            // Redireciona para o dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Usuário ou senha inválidos 😥');
        }
    });
});
