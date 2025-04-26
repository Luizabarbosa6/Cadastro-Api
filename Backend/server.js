require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Banco de dados conectado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro de conexão:', err.message);
  });
// Usando rotas
app.use('/api/users', userRoutes);

