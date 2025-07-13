document.addEventListener('DOMContentLoaded', () => {
    const mainContentArea = document.getElementById('main-content-area'); // A área onde o conteúdo será injetado
    const navLinks = document.querySelectorAll('.sidebar .nav-link'); // Seleciona todos os links da navegação lateral

    // Função assíncrona para carregar o conteúdo de uma página
    async function loadPage(pageName) {
        try {
            // Constrói o caminho para o arquivo HTML dentro da pasta 'pages'
            const response = await fetch(`pages/${pageName}.html`);

            // Verifica se a requisição foi bem-sucedida (status 200 OK)
            if (!response.ok) {
                // Se a página não for encontrada ou houver outro erro HTTP
                throw new Error(`Erro ao carregar a página "${pageName}": ${response.status} ${response.statusText}`);
            }

            const htmlContent = await response.text(); // Pega o conteúdo HTML como texto
            mainContentArea.innerHTML = htmlContent; // Insere o HTML na área principal

            // Opcional: Aqui é onde a complexidade maior entraria para carregar JS e CSS específicos
            // Por enquanto, vamos manter simples. Se uma página precisar de JS específico, ele pode ser
            // carregado no próprio pages/vendas.html, mas isso pode ter efeitos colaterais (scripts duplicados)
            // A solução mais robusta é injetar <script> e <link> dinamicamente aqui, mas é um passo avançado.

        } catch (error) {
            console.error("Falha ao carregar conteúdo da página:", error);
            mainContentArea.innerHTML = `<p style="color: red; text-align: center;">Erro ao carregar o conteúdo desta seção. Por favor, tente novamente.</p><p style="color: gray; font-size: 0.8em;">Detalhes técnicos: ${error.message}</p>`;
        }
    }

    // Adiciona um "ouvinte de evento" (event listener) a cada link de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o navegador de seguir o link e recarregar a página

            const pageName = event.target.dataset.page; // Pega o valor do atributo data-page
            const action = event.target.dataset.action; // Pega o valor do atributo data-action (para logout)

            if (pageName) {
                loadPage(pageName); // Carrega a página correspondente
            } else if (action === 'logout') {
                // Lógica de logout:
                sessionStorage.clear(); // Limpa dados da sessão (se houver algum usuário logado)
                window.location.href = 'auth.html'; // Redireciona para a tela de login
            }
        });
    });

    // Carrega o dashboard (pages/dashboard.html) assim que o dashboard.html principal é carregado
    loadPage('dashboard');
});