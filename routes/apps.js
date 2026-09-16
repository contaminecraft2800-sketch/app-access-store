const express = require('express');
const router = express.Router();
const App = require('../models/App');

// ✅ GET /api/apps - Listar todos os apps públicos
router.get('/', async (req, res) => {
  try {
    const apps = await App.find({ active: true }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET /api/apps/:id - Detalhes de um app específico
router.get('/:id', async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!app || !app.active) {
      return res.status(404).json({ error: 'App não encontrado' });
    }
    
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
