const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'UniPharma')));

// Dados em memória com IDs
let vendas = [];
let compras = [];
let estoque = [];
let clientes = [];
let relatorios = [];
let usuarios = [];

// Função utilitária para gerar ID
const gerarId = (arr) => arr.length ? Math.max(...arr.map(item => item.id || 0)) + 1 : 1;

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UniPharma/dashboard.html'));
});

//////////////////////////////////
// CRUD de Vendas
//////////////////////////////////
app.get('/api/vendas', (req, res) => res.json(vendas));
app.get('/api/vendas/:id', (req, res) => {
  const venda = vendas.find(v => v.id == req.params.id);
  venda ? res.json(venda) : res.status(404).send('Venda não encontrada');
});
app.post('/api/vendas', (req, res) => {
  const nova = { ...req.body, id: gerarId(vendas) };
  vendas.push(nova);
  res.status(201).json(nova);
});
app.put('/api/vendas/:id', (req, res) => {
  const idx = vendas.findIndex(v => v.id == req.params.id);
  if (idx !== -1) {
    vendas[idx] = { ...vendas[idx], ...req.body };
    res.json(vendas[idx]);
  } else res.status(404).send('Venda não encontrada');
});
app.delete('/api/vendas/:id', (req, res) => {
  vendas = vendas.filter(v => v.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Compras
//////////////////////////////////
app.get('/api/compras', (req, res) => res.json(compras));
app.get('/api/compras/:id', (req, res) => {
  const item = compras.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).send('Compra não encontrada');
});
app.post('/api/compras', (req, res) => {
  const nova = { ...req.body, id: gerarId(compras) };
  compras.push(nova);
  res.status(201).json(nova);
});
app.put('/api/compras/:id', (req, res) => {
  const idx = compras.findIndex(i => i.id == req.params.id);
  if (idx !== -1) {
    compras[idx] = { ...compras[idx], ...req.body };
    res.json(compras[idx]);
  } else res.status(404).send('Compra não encontrada');
});
app.delete('/api/compras/:id', (req, res) => {
  compras = compras.filter(i => i.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Estoque
//////////////////////////////////
app.get('/api/estoque', (req, res) => res.json(estoque));
app.get('/api/estoque/:id', (req, res) => {
  const item = estoque.find(i => i.id == req.params.id);
  item ? res.json(item) : res.status(404).send('Item não encontrado');
});
app.post('/api/estoque', (req, res) => {
  const novo = { ...req.body, id: gerarId(estoque) };
  estoque.push(novo);
  res.status(201).json(novo);
});
app.put('/api/estoque/:id', (req, res) => {
  const idx = estoque.findIndex(i => i.id == req.params.id);
  if (idx !== -1) {
    estoque[idx] = { ...estoque[idx], ...req.body };
    res.json(estoque[idx]);
  } else res.status(404).send('Item não encontrado');
});
app.delete('/api/estoque/:id', (req, res) => {
  estoque = estoque.filter(i => i.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Clientes
//////////////////////////////////
app.get('/api/clientes', (req, res) => res.json(clientes));
app.get('/api/clientes/:id', (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  cliente ? res.json(cliente) : res.status(404).send('Cliente não encontrado');
});
app.post('/api/clientes', (req, res) => {
  const novo = { ...req.body, id: gerarId(clientes) };
  clientes.push(novo);
  res.status(201).json(novo);
});
app.put('/api/clientes/:id', (req, res) => {
  const idx = clientes.findIndex(c => c.id == req.params.id);
  if (idx !== -1) {
    clientes[idx] = { ...clientes[idx], ...req.body };
    res.json(clientes[idx]);
  } else res.status(404).send('Cliente não encontrado');
});
app.delete('/api/clientes/:id', (req, res) => {
  clientes = clientes.filter(c => c.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Relatórios (simples)
//////////////////////////////////
app.get('/api/relatorios', (req, res) => res.json(relatorios));
app.post('/api/relatorios', (req, res) => {
  const novo = { ...req.body, id: gerarId(relatorios) };
  relatorios.push(novo);
  res.status(201).json(novo);
});
app.delete('/api/relatorios/:id', (req, res) => {
  relatorios = relatorios.filter(r => r.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////
// CRUD de Usuários (simples)
//////////////////////////////////
app.get('/api/usuarios', (req, res) => res.json(usuarios));
app.post('/api/usuarios', (req, res) => {
  const novo = { ...req.body, id: gerarId(usuarios) };
  usuarios.push(novo);
  res.status(201).json(novo);
});
app.delete('/api/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.status(204).send();
});

//////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
