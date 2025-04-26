// controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Criar novo usuário (só name, email, password)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se já existe usuario com o email
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // O hash da senha é feito automaticamente no pre('save') do schema
    const user = new User({ name, email, password });
    await user.save();

    // Não retornar o hash da senha
    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os usuários (sem password)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email');  // só fields necessários
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar um usuário por ID (sem password)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Fazer login (apenas email + password)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // busca pelo email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email não encontrado' });

    // compara senha com hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    // remove password do objeto retornado
    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(200).json({ message: 'Login bem-sucedido', user: userWithoutPassword });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar usuário (name, email e opcionalmente password)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('name email');

    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
