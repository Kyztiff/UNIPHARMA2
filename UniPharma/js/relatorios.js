document.addEventListener('DOMContentLoaded', function () {
  // --- Relatórios Pop-up Logic ---
  const btnRelatorios = document.getElementById('btnRelatorios');
  const relatoriosPopup = document.getElementById('relatoriosPopup');
  // Aqui seu botão fechar original (se tiver)
  const closeRelatoriosButton = relatoriosPopup?.querySelector('#closeRelatoriosPopup') || null;

  const btnAdicionarRelatorio = document.getElementById('btnAdicionarRelatorio');
  const manutencaoRelatoriosPopup = document.getElementById('manutencaoPopupRelatorios');
  const closeManutencaoRelatoriosButton = manutencaoRelatoriosPopup?.querySelector('.close-button-manutencao') || null;
  const btnVoltarManutencaoRelatorio = document.getElementById('btnVoltarManutencaoRelatorio');
  const btnSairRelatorios = document.getElementById('btnSairRelatorios');
  const btnSalvarManutencaoRelatorio = document.getElementById('btnSalvarManutencaoRelatorio');
  const btnEditarRelatoriosGeral = document.getElementById('btnEditarRelatoriosGeral');
  const tbodyRelatorios = document.getElementById('tbodyRelatorios');

  // Campos do formulário manutenção (existente)
  const inputTipo = document.getElementById('tipoRelatorio');
  const inputResponsavel = document.getElementById('responsavelRelatorio');
  const textareaDescricao = document.getElementById('descricaoRelatorio');

  // --- NOVA LÓGICA DO POP-UP EM ETAPAS ---

  // Criar container dentro do #relatoriosPopup para o novo pop-up de seleção e tabela
  // Recomendo que no seu HTML você crie esse bloco com id="popUpEtapasRelatorio"
  // para evitar conflito com a tabela de resumo já existente

  const popUpEtapas = document.createElement('div');
  popUpEtapas.id = 'popUpEtapasRelatorio';
  popUpEtapas.style.padding = '20px';
  popUpEtapas.style.backgroundColor = 'white';
  popUpEtapas.style.borderRadius = '8px';
  popUpEtapas.style.maxHeight = '80vh';
  popUpEtapas.style.overflowY = 'auto';
  popUpEtapas.style.display = 'none';
  popUpEtapas.style.width = '480px';
  popUpEtapas.style.margin = 'auto';

  relatoriosPopup.appendChild(popUpEtapas);

  // Etapas HTML (usando template literals para montar dentro do container)

  popUpEtapas.innerHTML = `
    <!-- Etapa 1 -->
    <div id="etapaTipoRelatorio" style="text-align:center;">
      <h2>Selecione o tipo de relatório</h2>
      <div class="tipo-opcao" data-tipo="compras" style="border:2px solid #007BFF; border-radius:6px; padding:15px; margin:10px 0; cursor:pointer; user-select:none; font-weight:bold; color:#007BFF;">Relatório de Compras</div>
      <div class="tipo-opcao" data-tipo="vendas" style="border:2px solid #007BFF; border-radius:6px; padding:15px; margin:10px 0; cursor:pointer; user-select:none; font-weight:bold; color:#007BFF;">Relatório de Vendas</div>
      <div class="tipo-opcao" data-tipo="clientes" style="border:2px solid #007BFF; border-radius:6px; padding:15px; margin:10px 0; cursor:pointer; user-select:none; font-weight:bold; color:#007BFF;">Relatório de Clientes</div>
      <div style="margin-top:20px;">
        <button id="btnCancelar1" style="background:#ccc; color:#333; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Cancelar</button>
      </div>
    </div>

    <!-- Etapa 2 -->
    <div id="etapaPeriodo" style="display:none;">
      <h2>Escolha o período</h2>
      <label for="dataInicio" style="display:block; margin-top:15px; font-weight:bold;">Data Inicial:</label>
      <input type="date" id="dataInicio" style="width:100%; padding:7px; font-size:16px; border:1.5px solid #ccc; border-radius:4px;"/>
      <label for="dataFim" style="display:block; margin-top:15px; font-weight:bold;">Data Final:</label>
      <input type="date" id="dataFim" style="width:100%; padding:7px; font-size:16px; border:1.5px solid #ccc; border-radius:4px;"/>
      <div style="margin-top:20px; text-align:right;">
        <button id="btnVoltar2" style="background:#ccc; color:#333; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Voltar</button>
        <button id="btnAvancar2" disabled style="background:#007BFF; color:#fff; border:none; padding:8px 16px; border-radius:5px; cursor:pointer; margin-left:10px;">Avançar</button>
      </div>
    </div>

    <!-- Etapa 3 -->
    <div id="etapaTabela" style="display:none;">
      <h2>Relatório: <span id="tituloRelatorio"></span></h2>
      <p>Período: <span id="periodoSelecionado"></span></p>
      <table style="width:100%; border-collapse:collapse; margin-top:15px;">
        <thead><tr id="tabelaCabecalho"></tr></thead>
        <tbody id="tabelaCorpo"></tbody>
      </table>
      <div style="margin-top:20px; text-align:right;">
        <button id="btnVoltar3" style="background:#ccc; color:#333; border:none; padding:8px 16px; border-radius:5px; cursor:pointer;">Voltar</button>
        <button id="btnFechar3" style="background:#007BFF; color:#fff; border:none; padding:8px 16px; border-radius:5px; cursor:pointer; margin-left:10px;">Fechar</button>
      </div>
    </div>
  `;

  // Seleciona os elementos das etapas recém criadas
  const etapa1 = document.getElementById('etapaTipoRelatorio');
  const etapa2 = document.getElementById('etapaPeriodo');
  const etapa3 = document.getElementById('etapaTabela');

  const btnCancelar1 = document.getElementById('btnCancelar1');
  const btnVoltar2 = document.getElementById('btnVoltar2');
  const btnAvancar2 = document.getElementById('btnAvancar2');
  const btnVoltar3 = document.getElementById('btnVoltar3');
  const btnFechar3 = document.getElementById('btnFechar3');

  const tipoOpcoes = popUpEtapas.querySelectorAll('.tipo-opcao');

  const inputDataInicio = document.getElementById('dataInicio');
  const inputDataFim = document.getElementById('dataFim');

  const tituloRelatorio = document.getElementById('tituloRelatorio');
  const periodoSelecionado = document.getElementById('periodoSelecionado');
  const tabelaCabecalho = document.getElementById('tabelaCabecalho');
  const tabelaCorpo = document.getElementById('tabelaCorpo');

  let tipoSelecionado = null;

  // Funções abrir/fechar o pop-up principal (resumo já existente)
  function openRelatoriosPopup() {
    relatoriosPopup.style.display = 'block';
    resetarPopUpEtapas();
    // esconder a tabela resumo antiga para não confundir
    if(tbodyRelatorios) tbodyRelatorios.closest('table').style.display = 'none';
    // mostrar o container do pop-up novo de etapas
    popUpEtapas.style.display = 'block';
  }
  function closeRelatoriosPopup() {
    relatoriosPopup.style.display = 'none';
    // ao fechar, restaurar tabela resumo antiga
    if(tbodyRelatorios) tbodyRelatorios.closest('table').style.display = 'table';
    popUpEtapas.style.display = 'none';
  }

  if (btnRelatorios) {
    btnRelatorios.addEventListener('click', function (event) {
      event.preventDefault();
      openRelatoriosPopup();
    });
  }
  if (closeRelatoriosButton) closeRelatoriosButton.addEventListener('click', closeRelatoriosPopup);

  btnCancelar1.addEventListener('click', closeRelatoriosPopup);
  btnFechar3.addEventListener('click', closeRelatoriosPopup);

  // Etapa 1 - escolha do tipo
  tipoOpcoes.forEach(opcao => {
    opcao.addEventListener('click', () => {
      tipoSelecionado = opcao.dataset.tipo;
      etapa1.style.display = 'none';
      etapa2.style.display = 'block';
    });
  });

  // Validação das datas na etapa 2
  function validarDatas() {
    const inicio = inputDataInicio.value;
    const fim = inputDataFim.value;
    btnAvancar2.disabled = !(inicio && fim && fim >= inicio);
  }
  inputDataInicio.addEventListener('change', validarDatas);
  inputDataFim.addEventListener('change', validarDatas);

  btnVoltar2.addEventListener('click', () => {
    etapa2.style.display = 'none';
    etapa1.style.display = 'block';
  });

  btnAvancar2.addEventListener('click', () => {
    etapa2.style.display = 'none';
    etapa3.style.display = 'block';
    montarTabela();
  });

  btnVoltar3.addEventListener('click', () => {
    etapa3.style.display = 'none';
    etapa2.style.display = 'block';
  });

  // Montar tabela com dados simulados (ajuste para usar API real)
  function montarTabela() {
    tituloRelatorio.textContent = tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1);
    periodoSelecionado.textContent = `${inputDataInicio.value} até ${inputDataFim.value}`;

    let cabecalhos = [];
    let dados = [];

    if (tipoSelecionado === 'compras') {
      cabecalhos = ['ID Compra', 'Produto', 'Quantidade', 'Data', 'Fornecedor'];
      dados = [
        ['C001', 'Paracetamol', 100, '2025-06-05', 'Farmacéutica A'],
        ['C002', 'Dipirona', 50, '2025-06-10', 'Farmacéutica B'],
        ['C003', 'Ibuprofeno', 75, '2025-06-15', 'Farmacéutica A'],
      ];
    } else if (tipoSelecionado === 'vendas') {
      cabecalhos = ['ID Venda', 'Cliente', 'Produto', 'Quantidade', 'Data'];
      dados = [
        ['V101', 'João Silva', 'Paracetamol', 3, '2025-06-07'],
        ['V102', 'Maria Souza', 'Dipirona', 1, '2025-06-12'],
        ['V103', 'Carlos Lima', 'Ibuprofeno', 2, '2025-06-17'],
      ];
    } else if (tipoSelecionado === 'clientes') {
      cabecalhos = ['ID Cliente', 'Nome', 'Telefone', 'E-mail', 'Data Cadastro'];
      dados = [
        ['CL01', 'João Silva', '(11) 99999-9999', 'joao@email.com', '2025-01-10'],
        ['CL02', 'Maria Souza', '(21) 98888-8888', 'maria@email.com', '2025-02-15'],
        ['CL03', 'Carlos Lima', '(31) 97777-7777', 'carlos@email.com', '2025-03-20'],
      ];
    }

    tabelaCabecalho.innerHTML = '';
    for (const thTexto of cabecalhos) {
      const th = document.createElement('th');
      th.textContent = thTexto;
      tabelaCabecalho.appendChild(th);
    }

    tabelaCorpo.innerHTML = '';
    const indiceData = cabecalhos.findIndex(h => h.toLowerCase().includes('data'));
    const dtInicio = new Date(inputDataInicio.value);
    const dtFim = new Date(inputDataFim.value);

    for (const linha of dados) {
      if (indiceData !== -1) {
        const dtLinha = new Date(linha[indiceData]);
        if (dtLinha < dtInicio || dtLinha > dtFim) continue;
      }
      const tr = document.createElement('tr');
      for (const celula of linha) {
        const td = document.createElement('td');
        td.textContent = celula;
        tr.appendChild(td);
      }
      tabelaCorpo.appendChild(tr);
    }

    if (tabelaCorpo.children.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = cabecalhos.length;
      td.style.textAlign = 'center';
      td.style.fontStyle = 'italic';
      td.textContent = 'Nenhum dado encontrado para o período selecionado.';
      tr.appendChild(td);
      tabelaCorpo.appendChild(tr);
    }
  }

  // Resetar etapas para o início
  function resetarPopUpEtapas() {
    tipoSelecionado = null;
    etapa1.style.display = 'block';
    etapa2.style.display = 'none';
    etapa3.style.display = 'none';
    inputDataInicio.value = '';
    inputDataFim.value = '';
    btnAvancar2.disabled = true;
    tabelaCabecalho.innerHTML = '';
    tabelaCorpo.innerHTML = '';
  }

  // Manutenção e outras lógicas existentes (mantidas)
  function openManutencaoRelatoriosPopup() {
    manutencaoRelatoriosPopup.style.display = 'relative';
  }

  function closeManutencaoRelatoriosPopup() {
    manutencaoRelatoriosPopup.style.display = 'none';
  }

  if (btnSairRelatorios) {
    btnSairRelatorios.addEventListener('click', function () {
      const confirmExit = confirm("Deseja salvar as alterações antes de sair?");
      if (confirmExit) {
        alert("Alterações de Relatórios salvas com sucesso!");
      } else {
        alert("Alterações de Relatórios descartadas.");
      }
      closeRelatoriosPopup();
    });
  }

  if (btnAdicionarRelatorio) {
    btnAdicionarRelatorio.addEventListener('click', function () {
      inputTipo.value = '';
      inputResponsavel.value = '';
      textareaDescricao.value = '';

      openManutencaoRelatoriosPopup();
      closeRelatoriosPopup();
    });
  }

  if (btnEditarRelatoriosGeral) {
    btnEditarRelatoriosGeral.addEventListener('click', function () {
      alert("Para editar, você precisaria selecionar uma linha primeiro. Abrindo o formulário de manutenção vazio por enquanto.");
      openManutencaoRelatoriosPopup();
      closeRelatoriosPopup();
    });
  }

  if (closeManutencaoRelatoriosButton) {
    closeManutencaoRelatoriosButton.addEventListener('click', closeManutencaoRelatoriosPopup);
  }

  if (btnVoltarManutencaoRelatorio) {
    btnVoltarManutencaoRelatorio.addEventListener('click', function () {
      const confirmSave = confirm("Deseja salvar as alterações?");
      if (confirmSave) {
        alert("Alterações de Manutenção de Relatórios salvas com sucesso!");
      } else {
        alert("Alterações de Manutenção de Relatórios descartadas.");
      }
      closeManutencaoRelatoriosPopup();
      openRelatoriosPopup();
    });
  }

  if (btnSalvarManutencaoRelatorio) {
    btnSalvarManutencaoRelatorio.addEventListener('click', function () {
      const tipo = inputTipo.value.trim();
      const responsavel = inputResponsavel.value.trim();
      const descricao = textareaDescricao.value.trim();
      const data = new Date().toLocaleDateString('pt-BR');

      if (!tipo || !responsavel) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const novoRelatorio = {
        tipo,
        responsavel,
        descricao,
        data
      };

      fetch('/api/relatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoRelatorio)
      })
        .then(response => {
          if (!response.ok) throw new Error("Erro ao salvar relatório");
          return response.json();
        })
        .then(relatorioSalvo => {
          const id = relatorioSalvo.id || Math.floor(Math.random() * 100000) + 1000;

          const newRow = tbodyRelatorios.insertRow(0);
          newRow.insertCell(0).textContent = id;
          newRow.insertCell(1).textContent = tipo;
          newRow.insertCell(2).textContent = responsavel;
          newRow.insertCell(3).textContent = data;

          alert("Relatório salvo e adicionado à tabela com sucesso!");
          closeManutencaoRelatoriosPopup();
          openRelatoriosPopup();
        })
        .catch(error => {
          console.error('Erro:', error);
          alert("Erro ao salvar relatório. Verifique o console.");
        });
    });
  }

  // Lógica do Menu de Perfil
  const profileIcon = document.getElementById('Usuario2');
  const profileMenu = document.getElementById('profileMenu');

  if (profileIcon && profileMenu) {
    profileIcon.addEventListener('click', function (event) {
      event.stopPropagation();
      profileMenu.style.display = (profileMenu.style.display === 'block' ? 'none' : 'block');
    });

    document.addEventListener('click', function (event) {
      if (profileMenu.style.display === 'block' &&
        !profileMenu.contains(event.target) &&
        event.target !== profileIcon) {
        profileMenu.style.display = 'none';
      }
    });
  }
});
