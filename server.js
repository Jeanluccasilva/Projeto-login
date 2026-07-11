
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Permite o servidor entender JSON vindo do front-end
app.use(express.json());

// Permite servir arquivos HTML, CSS e JS da pasta atual
app.use(express.static(__dirname));

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Validação simples
    if (!email || !senha) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'E-mail e senha são obrigatórios.'
        });
    }

    // Lê o arquivo users.json
    const usersPath = path.join(__dirname, 'users.json');
    const usersData = fs.readFileSync(usersPath, 'utf-8');
    const users = JSON.parse(usersData);

    // Procura usuário com mesmo e-mail e senha
    const usuarioEncontrado = users.find(user => {
        return user.email === email && user.senha === senha;
    });

    if (usuarioEncontrado) {
        return res.json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            }
        });
    }

    return res.status(401).json({
        sucesso: false,
        mensagem: 'E-mail ou senha inválidos.'
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});