document.addEventListener('DOMContentLoaded', function () {

    // --- Elementos do Pop-up de Manutenção de Vendas ---
    const btnAdicionarVenda = document.getElementById('btnAdicionarVenda');
    const manutencaoVendasPopup = document.getElementById('manutencaoPopup'); 
    const closeManutencaoVendasButton = manutencaoVendasPopup ? manutencaoVendasPopup.querySelector('.close-button-manutencao') : null;
    const btnVoltarManutencaoVendas = document.getElementById('btnVoltarManutencao');
    const btnSalvarManutencaoVenda = document.getElementById('btnSalvarManutencao');
    const btnEditarVendasGeral = document.getElementById('btnEditarVendasGeral');
    const tbodyVendas = document.getElementById('tbodyVendas');

    // --- Campos do formulário ---
    const inputVendedor = document.getElementById('vendedor');
    const inputConvenio = document.getElementById('convenio');
    const inputCliente = document.getElementById('cliente');
    const textareaObservacoesVenda = document.getElementById('observacoes');
    const inputTotalVenda = document.getElementById('total');

    // --- Funções para abrir/fechar popup ---
    function openManutencaoVendasPopup() {
        if (manutencaoVendasPopup) {
            manutencaoVendasPopup.style.display = 'flex';
        } else {
            console.error("Elemento 'manutencaoPopup' não encontrado!");
        }
    }

    function closeManutencaoVendasPopup() {
        if (manutencaoVendasPopup) {
            manutencaoVendasPopup.style.display = 'none';
        }
    }

    // --- Event Listeners ---

    // Abrir popup para nova venda
    if (btnAdicionarVenda) {
        btnAdicionarVenda.addEventListener('click', function () {
            inputVendedor.value = '';
            inputConvenio.value = '';
            inputCliente.value = '';
            textareaObservacoesVenda.value = '';
            inputTotalVenda.value = '';
            openManutencaoVendasPopup();
        });
    }

    // Editar vendas geral (por enquanto só abre o popup vazio)
    if (btnEditarVendasGeral) {
        btnEditarVendasGeral.addEventListener('click', function () {
            alert("Para editar, selecione uma linha primeiro. Abrindo formulário vazio.");
            openManutencaoVendasPopup();
        });
    }

    // Botão sair da página de vendas
    const btnSairVendasResumo = document.getElementById('btnSair');
    if (btnSairVendasResumo) {
        btnSairVendasResumo.addEventListener('click', function () {
            if (confirm("Deseja sair da página de Vendas e voltar para o Dashboard?")) {
                window.location.href = '../index.html';
            }
        });
    }

    // Fechar popup pelo botão de fechar
    if (closeManutencaoVendasButton) {
        closeManutencaoVendasButton.addEventListener('click', closeManutencaoVendasPopup);
    }

    // Botão voltar no popup de manutenção
    if (btnVoltarManutencaoVendas) {
        btnVoltarManutencaoVendas.addEventListener('click', function () {
            if (confirm("Deseja salvar as alterações?")) {
                alert("Alterações salvas com sucesso!");
            } else {
                alert("Alterações descartadas.");
            }
            closeManutencaoVendasPopup();
        });
    }

    // Adicionar nova linha de item na tabela (dentro do popup)
    const btnAdicionarItem = document.getElementById("btnAdicionarItem");
    if (btnAdicionarItem) {
        btnAdicionarItem.addEventListener("click", () => {
            const tabela = document.querySelector(".item-table tbody");

            const novaLinha = document.createElement("tr");
            novaLinha.innerHTML = `
                <td><input type="text" class="produto-input" placeholder="Nome do produto"></td>
                <td><input type="number" class="quantidade-input" min="1" value="1"></td>
                <td><input type="number" class="valor-input" min="0" step="0.01" value="0.00"></td>
                <td class="total-item">R$ 0,00</td>
            `;

            tabela.appendChild(novaLinha);
            // Se tiver função para atualizar soma, chame aqui: atualizarEventosDeSoma();
        });
    }

    // Botão salvar venda - AQUI FAZ O FETCH PRA SALVAR NO BACK
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

            const novaVenda = { vendedor, convenio, cliente, observacoes, total };

            fetch("http://localhost:3000/vendas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novaVenda)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao salvar a venda.");
                    return response.json();
                })
                .then(data => {
                    alert("Venda salva com sucesso!");
                    console.log("Resposta do servidor:", data);

                    const numeroVenda = Math.floor(Math.random() * 100000) + 1000;
                    const dataVenda = new Date().toLocaleDateString('pt-BR');

                    const newRow = tbodyVendas.insertRow(0);
                    newRow.insertCell(0).textContent = numeroVenda;
                    newRow.insertCell(1).textContent = cliente;
                    newRow.insertCell(2).textContent = dataVenda;
                    newRow.insertCell(3).textContent = total;

                    closeManutencaoVendasPopup();
                })
                .catch(error => {
                    alert("Erro ao salvar a venda no servidor.");
                    console.error(error);
                });
        });
    }

    // --- Lógica do Menu de Perfil ---
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

    // Botão para redirecionar para cadastro de cliente
    const btnAdicionarClienteVendas = document.getElementById("btnAdicionarClienteVendas");
    if (btnAdicionarClienteVendas) {
        btnAdicionarClienteVendas.addEventListener("click", function () {
            window.location.href = "clientes.html";
        });
    }

});
