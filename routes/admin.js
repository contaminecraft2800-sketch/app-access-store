const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const App = require('../models/App');

// ✅ POST /api/admin/add-app - Adicionar novo app
router.post('/add-app', adminAuth, async (req, res) => {
  try {
    const { name, description, price, appLink, icon } = req.body;

    // Validação
    if (!name || !price || !appLink) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios faltando',
        required: ['name', 'price', 'appLink']
      });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Preço deve ser um número positivo' });
    }

    const newApp = new App({
      name: name.trim(),
      description: description ? description.trim() : '',
      price,
      appLink: appLink.trim(),
      icon: icon ? icon.trim() : null
    });

    const savedApp = await newApp.save();
    
    res.status(201).json({ 
      message: '✅ App adicionado com sucesso!',
      app: savedApp
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao adicionar app',
      message: error.message 
    });
  }
});

// ✅ GET /api/admin/list-apps - Listar todos os apps (admin)
router.get('/list-apps', adminAuth, async (req, res) => {
  try {
    const apps = await App.find().sort({ createdAt: -1 });
    res.json({
      total: apps.length,
      apps: apps
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PUT /api/admin/edit-app/:id - Editar app
router.put('/edit-app/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, appLink, icon, active } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (price !== undefined) updateData.price = price;
    if (appLink !== undefined) updateData.appLink = appLink.trim();
    if (icon !== undefined) updateData.icon = icon ? icon.trim() : null;
    if (active !== undefined) updateData.active = active;

    const app = await App.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!app) {
      return res.status(404).json({ error: 'App não encontrado' });
    }

    res.json({ 
      message: '✅ App atualizado com sucesso',
      app 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE /api/admin/delete-app/:id - Deletar app
router.delete('/delete-app/:id', adminAuth, async (req, res) => {
  try {
    const app = await App.findByIdAndDelete(req.params.id);
    
    if (!app) {
      return res.status(404).json({ error: 'App não encontrado' });
    }

    res.json({ 
      message: '✅ App deletado com sucesso',
      app 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET /api/admin/stats - Estatísticas
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalApps = await App.countDocuments();
    const activeApps = await App.countDocuments({ active: true });
    const totalViews = await App.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);
    const totalPurchases = await App.aggregate([{ $group: { _id: null, total: { $sum: '$purchases' } } }]);

    res.json({
      totalApps,
      activeApps,
      inactiveApps: totalApps - activeApps,
      totalViews: totalViews[0]?.total || 0,
      totalPurchases: totalPurchases[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
