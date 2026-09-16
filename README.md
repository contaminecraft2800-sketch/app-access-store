# 🛍️ App Access Store

Plataforma completa para vender acesso aos seus apps com painel admin seguro.

## ✨ Funcionalidades

- ✅ **Admin Seguro** - Adicione apps com senha `Pedrodonodetudo`
- ✅ **Loja Moderna** - Interface para clientes
- ✅ **Gerenciar Apps** - Adicionar, editar e deletar
- ✅ **Links Diretos** - Redirecione para seus apps
- ✅ **Banco de Dados MongoDB** - Profissional e escalável

## 🚀 Quick Start

```bash
# Install
npm install

# Setup .env
cp .env.example .env

# Run
npm run dev
```

## 📍 URLs

- 🛍️ Loja: http://localhost:5000
- 🔐 Admin: http://localhost:5000/admin
- 🔑 Senha: `Pedrodonodetudo`

## 📱 Como Usar

### Adicionar Apps
1. Vá para http://localhost:5000/admin
2. Digite a senha
3. Preencha nome, preço e link do app
4. Clique em "Adicionar"

### Visualizar Loja
1. Vá para http://localhost:5000
2. Veja todos os apps
3. Clique para acessar

## 🔌 API

**Adicionar App:**
```bash
curl -X POST http://localhost:5000/api/admin/add-app \
  -H "Content-Type: application/json" \
  -d '{"password": "Pedrodonodetudo", "name": "App", "price": 29.99, "appLink": "https://app.com"}'
```

**Listar Apps:**
```bash
curl http://localhost:5000/api/apps
```

## 📁 Estrutura

```
.
├── public/           # HTML estático
├── routes/           # API routes
├── models/           # MongoDB models
├── middleware/       # Autenticação
├── server.js         # Servidor
└── package.json
```

## ⚠️ Segurança

Em produção:
- Altere a senha
- Use HTTPS
- Proteja .env
- Configure CORS

## 📝 Licença

MIT
