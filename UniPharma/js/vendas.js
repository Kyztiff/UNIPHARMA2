// js/vendas.js
document.addEventListener('DOMContentLoaded', function () {

    // --- Elementos do Pop-up de Manutenção de Vendas ---
    // Apenas selecionamos os elementos que existem e são relevantes para a manutenção.
    const btnAdicionarVenda = document.getElementById('btnAdicionarVenda');
    const manutencaoVendasPopup = document.getElementById('manutencaoPopup'); // Este é o overlay do modal de manutenção
    
    // Verifique se este botão existe no seu HTML dentro de 'manutencaoPopup'
    const closeManutencaoVendasButton = manutencaoVendasPopup ? manutencaoVendasPopup.querySelector('.close-button-manutencao') : null;
    
    const btnVoltarManutencaoVendas = document.getElementById('btnVoltarManutencao');
    const btnSalvarManutencaoVenda = document.getElementById('btnSalvarManutencao');
    const btnEditarVendasGeral = document.getElementById('btnEditarVendasGeral'); // Botão "Editar" do resumo
    const tbodyVendas = document.getElementById('tbodyVendas'); // Tabela do resumo

    // --- Campos do formulário de Manutenção de Vendas ---
    const inputVendedor = document.getElementById('vendedor');
    const inputConvenio = document.getElementById('convenio');
    const inputCliente = document.getElementById('cliente');
    const textareaObservacoesVenda = document.getElementById('observacoes');
    const inputTotalVenda = document.getElementById('total');

    // --- Funções para o Pop-up de Manutenção de Vendas ---
    function openManutencaoVendasPopup() {
        if (manutencaoVendasPopup) { // Verifica se o elemento foi encontrado antes de tentar manipulá-lo
            manutencaoVendasPopup.style.display = 'flex'; // Abre o modal de manutenção (como overlay)
        } else {
            console.error("Elemento 'manutencaoPopup' não encontrado!");
        }
    }

    function closeManutencaoVendasPopup() {
        if (manutencaoVendasPopup) { // Verifica se o elemento foi encontrado
            manutencaoVendasPopup.style.display = 'none'; // Fecha o modal de manutenção
        }
    }

    // --- Event Listeners para a Página de Vendas (Resumo) ---

    // Botão "Adicionar Venda" (no resumo, abre a manutenção)
    if (btnAdicionarVenda) {
        btnAdicionarVenda.addEventListener('click', function () {
            // Limpa os campos antes de abrir o formulário para uma nova entrada
            inputVendedor.value = '';
            inputConvenio.value = '';
            inputCliente.value = '';
            textareaObservacoesVenda.value = '';
            inputTotalVenda.value = '';

            openManutencaoVendasPopup(); // Abre o modal de manutenção
            // REMOVIDO: closeVendasPopup(); -- Não é mais necessário, e causava erro.
        });
    }

    // Botão "Editar Vendas Geral" (no resumo, abre a manutenção vazia por enquanto)
    if (btnEditarVendasGeral) {
        btnEditarVendasGeral.addEventListener('click', function () {
            alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
            openManutencaoVendasPopup();
            // REMOVIDO: closeVendasPopup(); -- Não é mais necessário, e causava erro.
        });
    }

    // Botão "Sair" do Resumo de Vendas
    const btnSairVendasResumo = document.getElementById('btnSair'); // O ID é 'btnSair' no seu HTML
    if (btnSairVendasResumo) {
        btnSairVendasResumo.addEventListener('click', function () {
            const confirmExit = confirm("Deseja sair da página de Vendas e voltar para o Dashboard?");
            if (confirmExit) {
                // Redireciona para a página principal (dashboard.html)
                // Ajuste o caminho se necessário (ex: window.location.href = '../../index.html';)
                window.location.href = '../index.html'; 
            }
        });
    }


    // --- Event Listeners para o Pop-up de Manutenção de Vendas ---

    // Botão de fechar dentro do modal de manutenção (se existir)
    if (closeManutencaoVendasButton) {
        closeManutencaoVendasButton.addEventListener('click', closeManutencaoVendasPopup);
    }

    // Botão "Voltar" dentro do modal de manutenção
    if (btnVoltarManutencaoVendas) {
        btnVoltarManutencaoVendas.addEventListener('click', function () {
            const confirmSave = confirm("Deseja salvar as alterações?");
            if (confirmSave) {
                alert("Alterações de Manutenção de Vendas salvas com sucesso!");
            } else {
                alert("Alterações de Manutenção de Vendas descartadas.");
            }
            closeManutencaoVendasPopup(); // Fecha o modal
            // REMOVIDO: openVendasPopup(); -- Não é mais necessário, pois o resumo é a página principal.
        });
    }

    document.getElementById("btnAdicionarItem").addEventListener("click", () => {
    const tabela = document.querySelector(".item-table tbody");

    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <td><input type="text" class="produto-input" placeholder="Nome do produto"></td>
        <td><input type="number" class="quantidade-input" min="1" value="1"></td>
        <td><input type="number" class="valor-input" min="0" step="0.01" value="0.00"></td>
        <td class="total-item">R$ 0,00</td>
    `;

    tabela.appendChild(novaLinha);
    atualizarEventosDeSoma();
});


    // Botão "Salvar" dentro do modal de manutenção
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

            // Simulação de envio para o backend (AJAX)
            // Em um ambiente real, você faria uma requisição Fetch/Axios aqui
            console.log("Dados da Venda para salvar:", novaVenda);
            alert("Venda salva e adicionada à tabela com sucesso (simulado)!");

            // Gera um número e data para a tabela (se não vier do backend)
            const numeroVenda = Math.floor(Math.random() * 100000) + 1000;
            const dataVenda = new Date().toLocaleDateString('pt-BR');

            // Adiciona a nova linha na tabela de resumo
            const newRow = tbodyVendas.insertRow(0);
            newRow.insertCell(0).textContent = numeroVenda;
            newRow.insertCell(1).textContent = cliente;
            newRow.insertCell(2).textContent = dataVenda;
            newRow.insertCell(3).textContent = total;

            closeManutencaoVendasPopup(); // Fecha o modal de manutenção
        });
    }

    // --- Lógica do Menu de Perfil (já estava no seu HTML/JS, mova para app.js se quiser global) ---
    // Se você já tem essa lógica no app.js (como discutimos antes para ser global),
    // pode remover este bloco daqui. Se não, mantenha-o em todas as páginas.
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