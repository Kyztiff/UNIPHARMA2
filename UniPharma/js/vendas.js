document.addEventListener('DOMContentLoaded', function () {
    // --- Vendas Pop-up Logic ---
    const btnVendas = document.getElementById('btnVendas');
    const vendasPopup = document.getElementById('vendasPopup');
    const closeVendasButton = vendasPopup.querySelector('#closeVendasPopup');
    const btnAdicionarVenda = document.getElementById('btnAdicionarVenda');
    const manutencaoVendasPopup = document.getElementById('manutencaoPopup');
    const closeManutencaoVendasButton = manutencaoVendasPopup.querySelector('.close-button-manutencao');
    const btnVoltarManutencaoVendas = document.getElementById('btnVoltarManutencao');
    const btnSairVendas = document.getElementById('btnSair');
    const btnSalvarManutencaoVenda = document.getElementById('btnSalvarManutencao');
    const btnEditarVendasGeral = document.getElementById('btnEditarVendasGeral');
    const tbodyVendas = document.getElementById('tbodyVendas');

    const inputVendedor = document.getElementById('vendedor');
    const inputConvenio = document.getElementById('convenio');
    const inputCliente = document.getElementById('cliente');
    const textareaObservacoesVenda = document.getElementById('observacoes');
    const inputTotalVenda = document.getElementById('total');

    function openVendasPopup() {
        vendasPopup.style.display = 'block';
    }

    function closeVendasPopup() {
        vendasPopup.style.display = 'none';
    }

    function openManutencaoVendasPopup() {
        manutencaoVendasPopup.style.display = 'flex';
    }

    function closeManutencaoVendasPopup() {
        manutencaoVendasPopup.style.display = 'none';
    }

    if (btnVendas) {
        btnVendas.addEventListener('click', function (event) {
            event.preventDefault();
            openVendasPopup();
        });
    }

    if (closeVendasButton) {
        closeVendasButton.addEventListener('click', closeVendasPopup);
    }

    if (btnSairVendas) {
        btnSairVendas.addEventListener('click', function () {
            const confirmExit = confirm("Deseja salvar as alterações antes de sair?");
            if (confirmExit) {
                alert("Alterações de Vendas salvas com sucesso!");
            } else {
                alert("Alterações de Vendas descartadas.");
            }
            closeVendasPopup();
        });
    }

    if (btnAdicionarVenda) {
        btnAdicionarVenda.addEventListener('click', function () {
            inputVendedor.value = '';
            inputConvenio.value = '';
            inputCliente.value = '';
            textareaObservacoesVenda.value = '';
            inputTotalVenda.value = '';

            openManutencaoVendasPopup();
            closeVendasPopup();
        });
    }

    if (btnEditarVendasGeral) {
        btnEditarVendasGeral.addEventListener('click', function () {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoVendasPopup();
            closeVendasPopup();
        });
    }

    if (closeManutencaoVendasButton) {
        closeManutencaoVendasButton.addEventListener('click', closeManutencaoVendasPopup);
    }

    if (btnVoltarManutencaoVendas) {
        btnVoltarManutencaoVendas.addEventListener('click', function () {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Vendas salvas com sucesso!");
            } else {
                alert("Alterações de Manutenção de Vendas descartadas.");
            }
            closeManutencaoVendasPopup();
            openVendasPopup();
        });
    }

    if (btnSalvarManutencaoVenda) {
        btnSalvarManutencaoVenda.addEventListener('click', function () {
            const vendedor = inputVendedor.value.trim();
            const convenio = inputConvenio.value.trim();
            const cliente = inputCliente.value.trim();
            const observacoes = textareaObservacoesVenda.value.trim();
            const total = inputTotalVenda.value.trim() || "R$ 0,00";

            if (!cliente) {
                alert("Por favor, preencha o campo Cliente para salvar a venda.");
                return;
            }

            const novaVenda = {
                vendedor,
                convenio,
                cliente,
                observacoes,
                total
            };

            // Envia para o backend com fetch
            fetch('/api/vendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaVenda)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao salvar no servidor");
                    return response.json();
                })
                .then(vendaSalva => {
                    const numeroVenda = vendaSalva.id || Math.floor(Math.random() * 100000) + 1000;
                    const dataVenda = new Date().toLocaleDateString('pt-BR');

                    const newRow = tbodyVendas.insertRow(0);
                    newRow.insertCell(0).textContent = numeroVenda;
                    newRow.insertCell(1).textContent = cliente;
                    newRow.insertCell(2).textContent = dataVenda;
                    newRow.insertCell(3).textContent = total;

                    alert("Venda salva e adicionada à tabela com sucesso!");
                    closeManutencaoVendasPopup();
                    openVendasPopup();
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert("Erro ao salvar venda. Verifique o console.");
                });
        });
    }

    // Menu de perfil
    const profileIcon = document.getElementById('Usuario2');
    const profileMenu = document.getElementById('profileMenu');

    if (profileIcon && profileMenu) {
        profileIcon.addEventListener('click', function (event) {
            event.stopPropagation();
            profileMenu.style.display = (profileMenu.style.display === 'block' ? 'none' : 'block');
        });

        document.addEventListener('click', function (event) {
            if (profileMenu.style.display === 'block' && !profileMenu.contains(event.target) && event.target !== profileIcon) {
                profileMenu.style.display = 'none';
            }
        });
    }
});
