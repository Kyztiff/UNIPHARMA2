const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'UniPharma')));

// Caminhos dos arquivos de dados
const DATA_PATH = path.join(__dirname, 'data');
const files = {
  vendas: 'vendas.json',
  compras: 'compras.json',
  estoque: 'estoque.json',
  clientes: 'clientes.json',
  relatorios: 'relatorios.json',
  usuarios: 'usuarios.json',
};

// Funções para carregar e salvar dados
function carregarDados(nome) {
  const filePath = path.join(DATA_PATH, files[nome]);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function salvarDados(nome, dados) {
  const filePath = path.join(DATA_PATH, files[nome]);
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}

// Vetores carregados dos arquivos
let vendas = carregarDados('vendas');
let compras = carregarDados('compras');
let estoque = carregarDados('estoque');
let clientes = carregarDados('clientes');
let relatorios = carregarDados('relatorios');
let usuarios = carregarDados('usuarios');

// Função utilitária para gerar ID (melhorada)
const gerarId = (arr) => {
  if (!arr.length) return 1;
  const ids = arr.map(item => item.id || 0);
  return Math.max(...ids) + 1;
};

// Validações simples para cada entidade (ajuste conforme necessidade)
function validarVenda(data) {
  if (!data.produto || typeof data.produto !== 'string') return 'Produto é obrigatório e deve ser texto';
  if (typeof data.quantidade !== 'number' || data.quantidade <= 0) return 'Quantidade deve ser número positivo';
  if (typeof data.valor !== 'number' || data.valor <= 0) return 'Valor deve ser número positivo';
  return null;
}

function validarCompra(data) {
  if (!data.fornecedor || typeof data.fornecedor !== 'string') return 'Fornecedor é obrigatório e deve ser texto';
  if (typeof data.quantidade !== 'number' || data.quantidade <= 0) return 'Quantidade deve ser número positivo';
  return null;
}

function validarEstoque(data) {
  if (!data.produto || typeof data.produto !== 'string') return 'Produto é obrigatório e deve ser texto';
  if (typeof data.quantidade !== 'number' || data.quantidade < 0) return 'Quantidade deve ser número >= 0';
  return null;
}

function validarCliente(data) {
  if (!data.nome || typeof data.nome !== 'string') return 'Nome é obrigatório e deve ser texto';
  if (!data.email || typeof data.email !== 'string') return 'Email é obrigatório e deve ser texto';
  return null;
}

function validarRelatorio(data) {
  if (!data.titulo || typeof data.titulo !== 'string') return 'Título é obrigatório e deve ser texto';
  if (!data.conteudo || typeof data.conteudo !== 'string') return 'Conteúdo é obrigatório e deve ser texto';
  return null;
}

function validarUsuario(data) {
  if (!data.usuario || typeof data.usuario !== 'string') return 'Usuário é obrigatório e deve ser texto';
  if (!data.senha || typeof data.senha !== 'string') return 'Senha é obrigatória e deve ser texto';
  return null;
}

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UniPharma/dashboard.html'));
});

//////////////////////////////////
// CRUD de Vendas
//////////////////////////////////
app.get('/api/vendas', (req, res) => res.json(vendas));

app.get('/api/vendas/:id', (req, res) => {
  const id = Number(req.params.id);
  const venda = vendas.find(v => v.id === id);
  venda ? res.json(venda) : res.status(404).send('Venda não encontrada');
});

app.post('/api/vendas', (req, res) => {
  const erro = validarVenda(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const nova = { ...req.body, id: gerarId(vendas) };
  vendas.push(nova);
  salvarDados('vendas', vendas);
  res.status(201).json(nova);
});

app.put('/api/vendas/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = vendas.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).send('Venda não encontrada');

  const erro = validarVenda(req.body);
  if (erro) return res.status(400).json({ error: erro });

  vendas[idx] = { ...vendas[idx], ...req.body, id };
  salvarDados('vendas', vendas);
  res.json(vendas[idx]);
});

app.delete('/api/vendas/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = vendas.length;
  vendas = vendas.filter(v => v.id !== id);
  if (vendas.length === inicial) return res.status(404).send('Venda não encontrada');
  salvarDados('vendas', vendas);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Compras
//////////////////////////////////
app.get('/api/compras', (req, res) => res.json(compras));

app.get('/api/compras/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = compras.find(i => i.id === id);
  item ? res.json(item) : res.status(404).send('Compra não encontrada');
});

app.post('/api/compras', (req, res) => {
  const erro = validarCompra(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const nova = { ...req.body, id: gerarId(compras) };
  compras.push(nova);
  salvarDados('compras', compras);
  res.status(201).json(nova);
});

app.put('/api/compras/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = compras.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).send('Compra não encontrada');

  const erro = validarCompra(req.body);
  if (erro) return res.status(400).json({ error: erro });

  compras[idx] = { ...compras[idx], ...req.body, id };
  salvarDados('compras', compras);
  res.json(compras[idx]);
});

app.delete('/api/compras/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = compras.length;
  compras = compras.filter(i => i.id !== id);
  if (compras.length === inicial) return res.status(404).send('Compra não encontrada');
  salvarDados('compras', compras);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Estoque
//////////////////////////////////
app.get('/api/estoque', (req, res) => res.json(estoque));

app.get('/api/estoque/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = estoque.find(i => i.id === id);
  item ? res.json(item) : res.status(404).send('Item não encontrado');
});

app.post('/api/estoque', (req, res) => {
  const erro = validarEstoque(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const novo = { ...req.body, id: gerarId(estoque) };
  estoque.push(novo);
  salvarDados('estoque', estoque);
  res.status(201).json(novo);
});

app.put('/api/estoque/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = estoque.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).send('Item não encontrado');

  const erro = validarEstoque(req.body);
  if (erro) return res.status(400).json({ error: erro });

  estoque[idx] = { ...estoque[idx], ...req.body, id };
  salvarDados('estoque', estoque);
  res.json(estoque[idx]);
});

app.delete('/api/estoque/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = estoque.length;
  estoque = estoque.filter(i => i.id !== id);
  if (estoque.length === inicial) return res.status(404).send('Item não encontrado');
  salvarDados('estoque', estoque);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Clientes
//////////////////////////////////
app.get('/api/clientes', (req, res) => res.json(clientes));

app.get('/api/clientes/:id', (req, res) => {
  const id = Number(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  cliente ? res.json(cliente) : res.status(404).send('Cliente não encontrado');
});

app.post('/api/clientes', (req, res) => {
  const erro = validarCliente(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const novo = { ...req.body, id: gerarId(clientes) };
  clientes.push(novo);
  salvarDados('clientes', clientes);
  res.status(201).json(novo);
});

app.put('/api/clientes/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = clientes.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).send('Cliente não encontrado');

  const erro = validarCliente(req.body);
  if (erro) return res.status(400).json({ error: erro });

  clientes[idx] = { ...clientes[idx], ...req.body, id };
  salvarDados('clientes', clientes);
  res.json(clientes[idx]);
});

app.delete('/api/clientes/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = clientes.length;
  clientes = clientes.filter(c => c.id !== id);
  if (clientes.length === inicial) return res.status(404).send('Cliente não encontrado');
  salvarDados('clientes', clientes);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Relatórios
//////////////////////////////////
app.get('/api/relatorios', (req, res) => res.json(relatorios));

app.post('/api/relatorios', (req, res) => {
  const erro = validarRelatorio(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const novo = { ...req.body, id: gerarId(relatorios) };
  relatorios.push(novo);
  salvarDados('relatorios', relatorios);
  res.status(201).json(novo);
});

app.delete('/api/relatorios/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = relatorios.length;
  relatorios = relatorios.filter(r => r.id !== id);
  if (relatorios.length === inicial) return res.status(404).send('Relatório não encontrado');
  salvarDados('relatorios', relatorios);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Usuários
//////////////////////////////////
app.get('/api/usuarios', (req, res) => res.json(usuarios));

app.post('/api/usuarios', (req, res) => {
  const erro = validarUsuario(req.body);
  if (erro) return res.status(400).json({ error: erro });

  const novo = { ...req.body, id: gerarId(usuarios) };
  usuarios.push(novo);
  salvarDados('usuarios', usuarios);
  res.status(201).json(novo);
});

app.delete('/api/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const inicial = usuarios.length;
  usuarios = usuarios.filter(u => u.id !== id);
  if (usuarios.length === inicial) return res.status(404).send('Usuário não encontrado');
  salvarDados('usuarios', usuarios);
  res.status(204).send();
});

//////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
