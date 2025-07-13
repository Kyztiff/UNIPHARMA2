// js/estoque.js
document.addEventListener('DOMContentLoaded', function() {

    // --- Elementos do Pop-up de Manutenção de Estoque ---
    // Apenas selecionamos os elementos que existem e são relevantes para a manutenção.
    const btnAdicionarProduto = document.getElementById('btnAdicionarProduto');
    const manutencaoEstoquePopup = document.getElementById('manutencaoEstoquePopup'); // Este é o overlay do modal de manutenção

    // Verifique se este botão com a classe 'close-button-manutencao-estoque' existe no seu HTML dentro de 'manutencaoEstoquePopup'
    const closeManutencaoEstoqueButton = manutencaoEstoquePopup ? manutencaoEstoquePopup.querySelector('.close-button-manutencao-estoque') : null;
    
    const btnVoltarManutencaoEstoque = document.getElementById('btnVoltarManutencaoEstoque');
    const btnSairEstoque = document.getElementById('btnSairEstoque'); // Botão "Sair" do resumo de estoque
    const btnSalvarManutencaoEstoque = document.getElementById('btnSalvarManutencaoEstoque');
    const btnEditarEstoqueGeral = document.getElementById('btnEditarEstoqueGeral'); // Botão "Editar" do resumo
    const tbodyEstoque = document.getElementById('tbodyEstoque'); // Tabela do resumo de estoque

    // --- Campos do formulário de Manutenção de Estoque ---
    const inputCodigoProduto = document.getElementById('codigoProduto');
    const inputNomeProduto = document.getElementById('nomeProduto');
    const inputQuantidadeProduto = document.getElementById('quantidadeProduto');
    const inputValorUnitarioProduto = document.getElementById('valorUnitarioProduto');
    const textareaObservacoesProduto = document.getElementById('observacoesProduto');

    // --- Funções para o Pop-up de Manutenção de Estoque ---
    function openManutencaoEstoquePopup() {
        if (manutencaoEstoquePopup) { // Verifica se o elemento foi encontrado antes de tentar manipulá-lo
            manutencaoEstoquePopup.style.display = 'flex'; // Abre o modal de manutenção (como overlay)
        } else {
            console.error("Elemento 'manutencaoEstoquePopup' não encontrado!");
        }
    }

    function closeManutencaoEstoquePopup() {
        if (manutencaoEstoquePopup) { // Verifica se o elemento foi encontrado
            manutencaoEstoquePopup.style.display = 'none'; // Fecha o modal de manutenção
        }
    }

    // --- Event Listeners para a Página de Estoque (Resumo) ---

    // Botão "Adicionar Produto" (no resumo, abre a manutenção)
    if (btnAdicionarProduto) {
        btnAdicionarProduto.addEventListener('click', function() {
            // Limpa os campos antes de abrir o formulário para uma nova entrada
            inputCodigoProduto.value = '';
            inputNomeProduto.value = '';
            inputQuantidadeProduto.value = '';
            inputValorUnitarioProduto.value = '';
            textareaObservacoesProduto.value = '';

            openManutencaoEstoquePopup(); // Abre o modal de manutenção
            // REMOVIDO: Chamada para closeEstoquePopup(); - Não é mais necessário, e causava erro.
        });
    }

    // Botão "Editar Estoque Geral" (no resumo, abre a manutenção vazia por enquanto)
    if (btnEditarEstoqueGeral) {
        btnEditarEstoqueGeral.addEventListener('click', function() {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoEstoquePopup();
            // REMOVIDO: Chamada para closeEstoquePopup(); - Não é mais necessário, e causava erro.
        });
    }

    // Botão "Sair" do Resumo de Estoque
    if (btnSairEstoque) {
        btnSairEstoque.addEventListener('click', function() {
            const confirmExit = confirm("Deseja sair da página de Estoque e voltar para o Dashboard?");
            if (confirmExit) {
                // Redireciona para a página principal (dashboard.html ou index.html)
                // Ajuste o caminho ../index.html se necessário de acordo com sua estrutura de pastas
                window.location.href = '../index.html';
            }
        });
    }


    // --- Event Listeners para o Pop-up de Manutenção de Estoque ---

    // Botão de fechar dentro do modal de manutenção (se existir)
    if (closeManutencaoEstoqueButton) {
        closeManutencaoEstoqueButton.addEventListener('click', closeManutencaoEstoquePopup);
    }

    // Botão "Voltar" dentro do modal de manutenção
    if (btnVoltarManutencaoEstoque) {
        btnVoltarManutencaoEstoque.addEventListener('click', function() {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Estoque salvas com sucesso!");
            } else {
                alert("Alterações de Manutenção de Estoque descartadas.");
            }
            closeManutencaoEstoquePopup(); // Fecha o modal
            // REMOVIDO: openEstoquePopup(); - Não é mais necessário, pois o resumo é a página principal.
        });
    }

    // Botão "Salvar" dentro do modal de manutenção
    if (btnSalvarManutencaoEstoque) {
        btnSalvarManutencaoEstoque.addEventListener('click', function() {
            const codigo = inputCodigoProduto.value.trim();
            const nome = inputNomeProduto.value.trim();
            const quantidade = inputQuantidadeProduto.value.trim();
            const valorUnitario = inputValorUnitarioProduto.value.trim();

            if (codigo && nome && quantidade && valorUnitario) {
                // Simulação: Adiciona a nova linha na tabela de resumo do Estoque
                const newRow = tbodyEstoque.insertRow(0); // Insere no topo da tabela
                newRow.insertCell(0).textContent = codigo;
                newRow.insertCell(1).textContent = nome;
                newRow.insertCell(2).textContent = quantidade;
                newRow.insertCell(3).textContent = valorUnitario;

                alert("Produto em Estoque salvo e adicionado à tabela com sucesso!");
            } else {
                alert("Por favor, preencha todos os campos (Código, Produto, Quantidade, Valor Unit.) para salvar o produto em estoque.");
            }

            closeManutencaoEstoquePopup(); // Fecha o modal de manutenção
        });
    }

    // --- Lógica do Menu de Perfil (comum) ---
    // Esta lógica deve ser movida para um arquivo JS global (como app.js)
    // e incluída em todas as páginas, para evitar duplicação e garantir funcionamento consistente.
    // Se você já tem isso em app.js e está incluindo app.js em todas as páginas, pode REMOVER este bloco daqui.
    const profileIcon = document.getElementById('Usuario2');
    const profileMenu = document.getElementById('profileMenu');

    if (profileIcon && profileMenu) {
        profileIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            profileMenu.style.display = (profileMenu.style.display === 'block' ? 'none' : 'block');
        });

        document.addEventListener('click', function(event) {
            if (profileMenu.style.display === 'block' && !profileMenu.contains(event.target) && event.target !== profileIcon) {
                profileMenu.style.display = 'none';
            }
        });
    }
});