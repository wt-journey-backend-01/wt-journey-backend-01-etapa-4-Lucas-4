const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const agentesRepository = require("../repositories/agentesRepository");
const { AppError } = require("../utils/errorHandler");

async function register(req, res) {
    const { nome, email, senha, cargo, dataDeIncorporacao } = req.body;

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoAgente = await agentesRepository.create({
        nome,
        email,
        senha: senhaHash,
        cargo,
        dataDeIncorporacao,
    });

    res.status(201).json({
        message: "Agente registrado com sucesso!",
        agente: novoAgente,
    });
}

async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        throw new AppError(400, "Email e senha são obrigatórios.");
    }

    const agente = await agentesRepository.findByEmail(email);
    if (!agente) {
        throw new AppError(404, "Credenciais inválidas."); // Mensagem genérica por segurança
    }

    const isSenhaCorreta = await bcrypt.compare(senha, agente.senha);
    if (!isSenhaCorreta) {
        throw new AppError(404, "Credenciais inválidas."); // Mensagem genérica por segurança
    }

    try {
        const token = jwt.sign(
            { id: agente.id, cargo: agente.cargo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        // Não retornar a senha
        const { senha: _, ...agenteInfo } = agente;

        res.status(200).json({
            message: "Login bem-sucedido!",
            agente: agenteInfo,
            token,
        });
    } catch (error) {
        throw new AppError(500, "Erro ao gerar token de autenticação.");
    }
}

module.exports = {
    register,
    login,
};
