document.addEventListener("DOMContentLoaded", function () {
    const opcoesTipo = document.querySelectorAll(".tipo-opcao");
    const etapaTipoRelatorio = document.getElementById("etapaTipoRelatorio");
    const etapaPeriodo = document.getElementById("etapaPeriodo");
    const tabelaRelatorioPopup = document.getElementById("tabelaRelatorioPopup");

    // Botões da etapa de período
    const btnVoltar2 = document.getElementById("btnVoltar2");
    const btnAvancar2 = document.getElementById("btnAvancar2"); // Botão "Gerar Relatório"

    // Botões da tabela de relatório
    const btnFecharTabelaRelatorio = document.getElementById("btnFecharTabelaRelatorio");
    const btnVoltar3 = document.getElementById("btnVoltar3");
    const btnFechar3 = document.getElementById("btnFechar3"); // Novo: botão "Fechar" da tabela

    let tipoSelecionado = "";

    // Função para abrir a primeira etapa (seleção do tipo de relatório)
    function abrirMenuRelatorios() {
        etapaTipoRelatorio.style.display = "block"; // Mostra a seleção de tipo
        etapaPeriodo.style.display = "none";      // Esconde a seleção de período
        tabelaRelatorioPopup.style.display = "none"; // Esconde a tabela de relatório
        document.getElementById("dataInicio").value = ""; // Limpa os campos de data
        document.getElementById("dataFim").value = "";   // Limpa os campos de data
        btnAvancar2.disabled = true; // Desabilita o botão "Gerar Relatório"
        tipoSelecionado = ""; // Reseta o tipo selecionado
    }

    // Inicializa a página mostrando a primeira etapa
    abrirMenuRelatorios();

    // Event listener para as opções de tipo de relatório
    opcoesTipo.forEach(opcao => {
        opcao.addEventListener("click", () => {
            tipoSelecionado = opcao.dataset.tipo;
            etapaTipoRelatorio.style.display = "none"; // Esconde a seleção de tipo
            etapaPeriodo.style.display = "block";      // Mostra a seleção de período
            // Garante que o botão "Gerar Relatório" esteja desabilitado até as datas serem preenchidas
            validarDatas();
        });
    });

    // Botão Voltar da etapa de período (volta para seleção de tipo)
    btnVoltar2.addEventListener("click", () => {
        etapaPeriodo.style.display = "none";
        etapaTipoRelatorio.style.display = "block";
    });

    // Validação para habilitar/desabilitar o botão "Gerar Relatório"
    const dataInicio = document.getElementById("dataInicio");
    const dataFim = document.getElementById("dataFim");

    function validarDatas() {
        if (dataInicio.value && dataFim.value) {
            btnAvancar2.disabled = false;
        } else {
            btnAvancar2.disabled = true;
        }
    }

    dataInicio.addEventListener("input", validarDatas);
    dataFim.addEventListener("input", validarDatas);

    // Quando clica em "Gerar Relatório"
    btnAvancar2.addEventListener("click", () => {
        const tituloRelatorio = document.getElementById("tituloRelatorio");
        const periodoSelecionado = document.getElementById("periodoSelecionado");

        // Atualiza o título e período no popup da tabela
        tituloRelatorio.textContent = `Relatório de ${tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1)}`; // Ex: "Relatório de Compras"
        periodoSelecionado.textContent = `${dataInicio.value} até ${dataFim.value}`;

        etapaPeriodo.style.display = "none";       // Esconde a etapa de período
        tabelaRelatorioPopup.style.display = "block"; // Mostra o popup da tabela

        gerarTabela(tipoSelecionado); // Chama a função para popular a tabela
    });

    // Fechar pop-up da tabela (botão 'x')
    btnFechar3.addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
        // Volta para a seleção do tipo de relatório após fechar a tabela
        abrirMenuRelatorios();
    });

    // Botão Voltar da tabela de relatório (volta para seleção de período)
    btnVoltar3.addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
        etapaPeriodo.style.display = "block";
    });

    // Botão Fechar da tabela de relatório (volta para a seleção de tipo de relatório)
    btnFechar3.addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
        abrirMenuRelatorios(); // Retorna à primeira etapa
    });

    // Função para gerar dados fictícios na tabela (seu código original)
    function gerarTabela(tipo) {
        const cabecalho = document.getElementById("tabelaCabecalho");
        const corpo = document.getElementById("tabelaCorpo");

        cabecalho.innerHTML = "";
        corpo.innerHTML = "";

        if (tipo === "compras") {
            cabecalho.innerHTML = "<th>Data</th><th>Fornecedor</th><th>Total</th>";
            corpo.innerHTML = `
                <tr><td>2025-07-01</td><td>DrogaSul</td><td>R$ 850,00</td></tr>
                <tr><td>2025-07-05</td><td>PharmaVida</td><td>R$ 1.200,00</td></tr>
            `;
        } else if (tipo === "vendas") {
            cabecalho.innerHTML = "<th>Data</th><th>Cliente</th><th>Valor</th>";
            corpo.innerHTML = `
                <tr><td>2025-07-03</td><td>Ana Clara</td><td>R$ 320,00</td></tr>
                <tr><td>2025-07-04</td><td>Lucas B.</td><td>R$ 210,00</td></tr>
            `;
        } else if (tipo === "clientes") {
            cabecalho.innerHTML = "<th>Nome</th><th>Última Compra</th><th>Total Gasto</th>";
            corpo.innerHTML = `
                <tr><td>João Silva</td><td>2025-07-02</td><td>R$ 1.400,00</td></tr>
                <tr><td>Maria S.</td><td>2025-07-06</td><td>R$ 980,00</td></tr>
            `;
        }
    }
});