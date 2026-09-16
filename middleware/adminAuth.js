// Middleware para autenticar admin
const adminAuth = (req, res, next) => {
  const password = req.body.password || req.query.password;
  
  if (!password) {
    return res.status(401).json({ 
      error: 'Senha necessária',
      message: 'Por favor, forneça a senha de admin' 
    });
  }
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ 
      error: 'Senha incorreta',
      message: 'A senha fornecida é inválida' 
    });
  }
  
  next();
};

module.exports = adminAuth;
