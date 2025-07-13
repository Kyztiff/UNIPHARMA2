document.addEventListener('DOMContentLoaded', function() {
    // --- Compras Pop-up Logic ---
    const btnCompras = document.getElementById('btnCompras');
    const comprasPopup = document.getElementById('comprasPopup');
    const closeComprasButton = comprasPopup.querySelector('.close-button-compras');
    const btnAdicionarCompra = document.getElementById('btnAdicionarCompra');
    const manutencaoCompraPopup = document.getElementById('manutencaoCompraPopup');
    const closeManutencaoCompraButton = manutencaoCompraPopup.querySelector('.close-button-manutencao-compra');
    const btnVoltarManutencaoCompra = document.getElementById('btnVoltarManutencaoCompra');
    const btnSairCompras = document.getElementById('btnSairCompras');
    const btnSalvarManutencaoCompra = document.getElementById('btnSalvarManutencaoCompra');
    const btnEditarComprasGeral = document.getElementById('btnEditarComprasGeral');
    const tbodyCompras = document.getElementById('tbodyCompras');

    // Campos do formulário de Manutenção de Compras
    const inputFornecedor = document.getElementById('fornecedor');
    const inputDataCompra = document.getElementById('dataCompra');
    const selectTipoCompra = document.getElementById('tipoCompra');
    const textareaObservacoesCompra = document.getElementById('observacoesCompra');
    const inputTotalCompra = document.getElementById('totalCompra');

    // Funções para Compras

    function openManutencaoComprasPopup() {
        manutencaoCompraPopup.style.display = 'flex';
    }

    function closeManutencaoComprasPopup() {
        manutencaoCompraPopup.style.display = 'none';
    }

    // Event Listeners para Compras (Resumo)
    if (btnCompras) {
        btnCompras.addEventListener('click', function(event) {
            event.preventDefault();
            openComprasPopup();
        });
    }

    if (closeComprasButton) {
        closeComprasButton.addEventListener('click', closeComprasPopup);
    }

    if (btnSairCompras) {
        btnSairCompras.addEventListener('click', function() {
            const confirmExit = confirm("Deseja salvar as alterações antes de sair?");
            if (confirmExit) {
                alert("Alterações de Compras salvas com sucesso!");
                closeComprasPopup();
            } else {
                alert("Alterações de Compras descartadas.");
                closeComprasPopup();
            }
        });
    }

    // Botão adicionar compra (abre manutenção)
    if (btnAdicionarCompra) {
        btnAdicionarCompra.addEventListener('click', function() {
            inputFornecedor.value = '';
            inputDataCompra.value = '';
            selectTipoCompra.value = 'externa';
            textareaObservacoesCompra.value = '';
            inputTotalCompra.value = '';

            openManutencaoComprasPopup();
            closeComprasPopup();
        });
    }

    // Botão edição geral (abre manutenção vazia)
    if (btnEditarComprasGeral) {
        btnEditarComprasGeral.addEventListener('click', function() {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoComprasPopup();
            closeComprasPopup();
        });
    }

    // Event Listeners para Manutenção de Compras
    if (closeManutencaoCompraButton) {
        closeManutencaoCompraButton.addEventListener('click', closeManutencaoComprasPopup);
    }

    if (btnVoltarManutencaoCompra) {
        btnVoltarManutencaoCompra.addEventListener('click', function() {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Compras salvas com sucesso!");
                closeManutencaoComprasPopup();
                openComprasPopup();
            } else {
                alert("Alterações de Manutenção de Compras descartadas.");
                closeManutencaoComprasPopup();
                openComprasPopup();
            }
        });
    }

    // Lógica para salvar nova compra
    if (btnSalvarManutencaoCompra) {
        btnSalvarManutencaoCompra.addEventListener('click', function() {
            const fornecedor = inputFornecedor.value.trim();
            const dataCompra = inputDataCompra.value;
            const valorCompra = inputTotalCompra.value;
            const numeroCompra = Math.floor(Math.random() * 900000) + 1000;

            if (fornecedor && dataCompra && valorCompra) {
                const newRow = tbodyCompras.insertRow(0);

                const cellNumero = newRow.insertCell(0);
                const cellFornecedor = newRow.insertCell(1);
                const cellData = newRow.insertCell(2);
                const cellValor = newRow.insertCell(3);

                cellNumero.textContent = numeroCompra;
                cellFornecedor.textContent = fornecedor;
                cellData.textContent = dataCompra;
                cellValor.textContent = valorCompra;

                alert("Compra salva e adicionada à tabela com sucesso!");
            } else {
                alert("Por favor, preencha Fornecedor, Data da Compra e Total para salvar a compra na tabela.");
            }

            closeManutencaoComprasPopup();
            openComprasPopup();
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
