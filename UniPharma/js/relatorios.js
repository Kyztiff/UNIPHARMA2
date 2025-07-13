document.addEventListener("DOMContentLoaded", function () {
    const opcoesTipo = document.querySelectorAll(".tipo-opcao");
    const etapaTipoRelatorio = document.getElementById("etapaTipoRelatorio");
    const etapaPeriodo = document.getElementById("etapaPeriodo");
    const tabelaRelatorioPopup = document.getElementById("tabelaRelatorioPopup");
    const btnCancelar1 = document.getElementById("btnCancelar1");
    const btnVoltar2 = document.getElementById("btnVoltar2");
    const btnAvancar2 = document.getElementById("btnAvancar2");

    let tipoSelecionado = "";

    // Função para abrir o menu Relatórios na etapa 1 e resetar estados
    function abrirMenuRelatorios() {
        etapaTipoRelatorio.style.display = "block";
        etapaPeriodo.style.display = "none";
        tabelaRelatorioPopup.style.display = "none";
        document.getElementById("dataInicio").value = "";
        document.getElementById("dataFim").value = "";
        btnAvancar2.disabled = true;
        tipoSelecionado = "";
    }

    // Chamar logo ao carregar a página para mostrar etapa 1
    abrirMenuRelatorios();

    // Se tiver botão para abrir relatório, conecta aqui (opcional)
    const btnAbrirRelatorios = document.getElementById("btnAbrirRelatorios");
    btnAbrirRelatorios?.addEventListener("click", abrirMenuRelatorios);

    // Quando clica numa das opções (compras, vendas, clientes)
    opcoesTipo.forEach(opcao => {
        opcao.addEventListener("click", () => {
            tipoSelecionado = opcao.dataset.tipo;
            etapaTipoRelatorio.style.display = "none";
            etapaPeriodo.style.display = "block";
        });
    });

    // Botão cancelar (volta pro menu principal)
    btnCancelar1.addEventListener("click", () => {
        // Redirecionar ou fechar popup conforme seu fluxo
        window.location.href = "dashboard.html"; 
    });

    // Botão voltar (volta para a seleção de tipo)
    btnVoltar2.addEventListener("click", () => {
        etapaPeriodo.style.display = "none";
        etapaTipoRelatorio.style.display = "block";
    });

    // Validação para habilitar botão avançar
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

        tituloRelatorio.textContent = tipoSelecionado.toUpperCase();
        periodoSelecionado.textContent = `${dataInicio.value} até ${dataFim.value}`;

        etapaPeriodo.style.display = "none";
        tabelaRelatorioPopup.style.display = "block";

        gerarTabela(tipoSelecionado);
    });

    // Função para gerar dados fictícios na tabela
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

    // Fechar pop-up de tabela
    document.getElementById("btnFecharTabelaRelatorio").addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
    });

    document.getElementById("btnFechar3").addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
    });

    document.getElementById("btnVoltar3").addEventListener("click", () => {
        tabelaRelatorioPopup.style.display = "none";
        etapaPeriodo.style.display = "block";
    });
});
