// js/compras.js
document.addEventListener('DOMContentLoaded', function() {

    // --- Elementos do Pop-up de Manutenção de Compras ---
    // Apenas selecionamos os elementos que existem e são relevantes para a manutenção.
    const btnAdicionarCompra = document.getElementById('btnAdicionarCompra');
    const manutencaoCompraPopup = document.getElementById('manutencaoCompraPopup'); // Este é o overlay do modal de manutenção

    // Verifique se este botão com a classe 'close-button-manutencao-compra' existe no seu HTML dentro de 'manutencaoCompraPopup'
    const closeManutencaoCompraButton = manutencaoCompraPopup ? manutencaoCompraPopup.querySelector('.close-button-manutencao-compra') : null;
    
    const btnVoltarManutencaoCompra = document.getElementById('btnVoltarManutencaoCompra');
    const btnSairCompras = document.getElementById('btnSairCompras'); // Botão "Sair" do resumo de compras
    const btnSalvarManutencaoCompra = document.getElementById('btnSalvarManutencaoCompra');
    const btnEditarComprasGeral = document.getElementById('btnEditarComprasGeral'); // Botão "Editar" do resumo
    const tbodyCompras = document.getElementById('tbodyCompras'); // Tabela do resumo de compras

    // --- Campos do formulário de Manutenção de Compras ---
    const inputFornecedor = document.getElementById('fornecedor');
    const inputDataCompra = document.getElementById('dataCompra');
    const selectTipoCompra = document.getElementById('tipoCompra');
    const textareaObservacoesCompra = document.getElementById('observacoesCompra');
    const inputTotalCompra = document.getElementById('totalCompra');

    // --- Funções para o Pop-up de Manutenção de Compras ---
    function openManutencaoComprasPopup() {
        if (manutencaoCompraPopup) { // Verifica se o elemento foi encontrado antes de tentar manipulá-lo
            manutencaoCompraPopup.style.display = 'flex'; // Abre o modal de manutenção (como overlay)
        } else {
            console.error("Elemento 'manutencaoCompraPopup' não encontrado!");
        }
    }

    function closeManutencaoComprasPopup() {
        if (manutencaoCompraPopup) { // Verifica se o elemento foi encontrado
            manutencaoCompraPopup.style.display = 'none'; // Fecha o modal de manutenção
        }
    }

    // --- Event Listeners para a Página de Compras (Resumo) ---

    // Botão "Adicionar Compra" (no resumo, abre a manutenção)
    if (btnAdicionarCompra) {
        btnAdicionarCompra.addEventListener('click', function() {
            // Limpa os campos antes de abrir o formulário para uma nova entrada
            inputFornecedor.value = '';
            inputDataCompra.value = '';
            selectTipoCompra.value = 'externa';
            textareaObservacoesCompra.value = '';
            inputTotalCompra.value = '';

            openManutencaoComprasPopup(); // Abre o modal de manutenção
            // REMOVIDO: closeComprasPopup(); - Não é mais necessário, e causava erro.
        });
    }

    // Botão "Editar Compras Geral" (no resumo, abre a manutenção vazia por enquanto)
    if (btnEditarComprasGeral) {
        btnEditarComprasGeral.addEventListener('click', function() {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoComprasPopup();
            // REMOVIDO: closeComprasPopup(); - Não é mais necessário, e causava erro.
        });
    }

    // Botão "Sair" do Resumo de Compras
    if (btnSairCompras) {
        btnSairCompras.addEventListener('click', function() {
            const confirmExit = confirm("Deseja sair da página de Compras e voltar para o Dashboard?");
            if (confirmExit) {
                // Redireciona para a página principal (dashboard.html ou index.html)
                // Ajuste o caminho ../index.html se necessário de acordo com sua estrutura de pastas
                window.location.href = '../index.html';
            }
        });
    }


    // --- Event Listeners para o Pop-up de Manutenção de Compras ---

    // Botão de fechar dentro do modal de manutenção (se existir)
    if (closeManutencaoCompraButton) {
        closeManutencaoCompraButton.addEventListener('click', closeManutencaoComprasPopup);
    }

    // Botão "Voltar" dentro do modal de manutenção
    if (btnVoltarManutencaoCompra) {
        btnVoltarManutencaoCompra.addEventListener('click', function() {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Compras salvas com sucesso!");
            } else {
                alert("Alterações de Manutenção de Compras descartadas.");
            }
            closeManutencaoComprasPopup(); // Fecha o modal
            // REMOVIDO: openComprasPopup(); - Não é mais necessário, pois o resumo é a página principal.
        });
    }

    // Botão "Salvar" dentro do modal de manutenção
    if (btnSalvarManutencaoCompra) {
        btnSalvarManutencaoCompra.addEventListener('click', function() {
            const fornecedor = inputFornecedor.value.trim();
            const dataCompra = inputDataCompra.value;
            const valorCompra = inputTotalCompra.value; // Você pode querer formatar isso para R$

            if (fornecedor && dataCompra && valorCompra) {
                // Simulação: Adiciona a nova linha na tabela de resumo de Compras
                const numeroCompra = Math.floor(Math.random() * 900000) + 1000; // Gera um número de compra
                
                const newRow = tbodyCompras.insertRow(0); // Insere no topo da tabela
                newRow.insertCell(0).textContent = numeroCompra;
                newRow.insertCell(1).textContent = fornecedor;
                newRow.insertCell(2).textContent = dataCompra;
                newRow.insertCell(3).textContent = valorCompra;

                alert("Compra salva e adicionada à tabela com sucesso!");
            } else {
                alert("Por favor, preencha Fornecedor, Data da Compra e Total para salvar a compra na tabela.");
            }

            closeManutencaoComprasPopup(); // Fecha o modal de manutenção
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