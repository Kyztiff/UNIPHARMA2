document.addEventListener('DOMContentLoaded', function() {
    // --- Estoque Pop-up Logic ---
    const btnEstoque = document.getElementById('btnEstoque');
    const estoquePopup = document.getElementById('estoquePopup');
    const closeEstoqueButton = estoquePopup.querySelector('.close-button-estoque');
    const btnAdicionarProduto = document.getElementById('btnAdicionarProduto');
    const manutencaoEstoquePopup = document.getElementById('manutencaoEstoquePopup');
    const closeManutencaoEstoqueButton = manutencaoEstoquePopup.querySelector('.close-button-manutencao-estoque');
    const btnVoltarManutencaoEstoque = document.getElementById('btnVoltarManutencaoEstoque');
    const btnSairEstoque = document.getElementById('btnSairEstoque');
    const btnSalvarManutencaoEstoque = document.getElementById('btnSalvarManutencaoEstoque');
    const btnEditarEstoqueGeral = document.getElementById('btnEditarEstoqueGeral');
    const tbodyEstoque = document.getElementById('tbodyEstoque');

    // Campos do formulário de Manutenção de Estoque
    const inputCodigoProduto = document.getElementById('codigoProduto');
    const inputNomeProduto = document.getElementById('nomeProduto');
    const inputQuantidadeProduto = document.getElementById('quantidadeProduto');
    const inputValorUnitarioProduto = document.getElementById('valorUnitarioProduto');
    const textareaObservacoesProduto = document.getElementById('observacoesProduto');

    // Funções para Estoque

    function openManutencaoEstoquePopup() {
        manutencaoEstoquePopup.style.display = 'flex';
    }

    function closeManutencaoEstoquePopup() {
        manutencaoEstoquePopup.style.display = 'none';
    }

    // Event Listeners para Estoque (Resumo)
    if (btnEstoque) {
        btnEstoque.addEventListener('click', function(event) {
            event.preventDefault();
            openEstoquePopup();
        });
    }

    if (closeEstoqueButton) {
        closeEstoqueButton.addEventListener('click', closeEstoquePopup);
    }

    if (btnSairEstoque) {
        btnSairEstoque.addEventListener('click', function() {
            const confirmExit = confirm("Deseja salvar as alterações antes de sair?");
            if (confirmExit) {
                alert("Alterações de Estoque salvas com sucesso!");
                closeEstoquePopup();
            } else {
                alert("Alterações de Estoque descartadas.");
                closeEstoquePopup();
            }
        });
    }

    // Botão adicionar produto (abre manutenção)
    if (btnAdicionarProduto) {
        btnAdicionarProduto.addEventListener('click', function() {
            inputCodigoProduto.value = '';
            inputNomeProduto.value = '';
            inputQuantidadeProduto.value = '';
            inputValorUnitarioProduto.value = '';
            textareaObservacoesProduto.value = '';

            openManutencaoEstoquePopup();
            closeEstoquePopup();
        });
    }

    // Botão edição geral (abre manutenção vazia)
    if (btnEditarEstoqueGeral) {
        btnEditarEstoqueGeral.addEventListener('click', function() {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoEstoquePopup();
            closeEstoquePopup();
        });
    }

    // Event Listeners para Manutenção de Estoque
    if (closeManutencaoEstoqueButton) {
        closeManutencaoEstoqueButton.addEventListener('click', closeManutencaoEstoquePopup);
    }

    if (btnVoltarManutencaoEstoque) {
        btnVoltarManutencaoEstoque.addEventListener('click', function() {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Estoque salvas com sucesso!");
                closeManutencaoEstoquePopup();
                openEstoquePopup();
            } else {
                alert("Alterações de Manutenção de Estoque descartadas.");
                closeManutencaoEstoquePopup();
                openEstoquePopup();
            }
        });
    }

    if (btnSalvarManutencaoEstoque) {
        btnSalvarManutencaoEstoque.addEventListener('click', function() {
            const codigo = inputCodigoProduto.value.trim();
            const nome = inputNomeProduto.value.trim();
            const quantidade = inputQuantidadeProduto.value.trim();
            const valorUnitario = inputValorUnitarioProduto.value.trim();

            if (codigo && nome && quantidade && valorUnitario) {
                const newRow = tbodyEstoque.insertRow(0);

                const cellCodigo = newRow.insertCell(0);
                const cellProduto = newRow.insertCell(1);
                const cellQuantidade = newRow.insertCell(2);
                const cellValorUnitario = newRow.insertCell(3);

                cellCodigo.textContent = codigo;
                cellProduto.textContent = nome;
                cellQuantidade.textContent = quantidade;
                cellValorUnitario.textContent = valorUnitario;

                alert("Produto em Estoque salvo e adicionado à tabela com sucesso!");
            } else {
                alert("Por favor, preencha todos os campos (Código, Produto, Quantidade, Valor Unit.) para salvar o produto em estoque.");
            }

            closeManutencaoEstoquePopup();
            openEstoquePopup();
        });
    }

    // Lógica do Menu de Perfil (comum)
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
