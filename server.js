require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conectar MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/app-access-store')
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.log('⚠️ Rodando sem banco de dados:', err.message));
}

// API Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/apps', require('./routes/apps'));

// Servir arquivos estáticos HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log('🚀 Servidor iniciado com sucesso!');
  console.log('🚀 ========================================');
  console.log(`🛍️ Loja de Apps: http://localhost:${PORT}`);
  console.log(`🔐 Painel Admin: http://localhost:${PORT}/admin`);
  console.log(`🔑 Senha Admin: ${process.env.ADMIN_PASSWORD}`);
  console.log('🚀 ========================================\n');
});

module.exports = server;
