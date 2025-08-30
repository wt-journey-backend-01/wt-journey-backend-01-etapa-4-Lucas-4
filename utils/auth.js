const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extrai o token do header 'Bearer TOKEN'
            token = req.headers.authorization.split(" ")[1];

            // Verifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Anexa o usuário decodificado (payload do token) ao request
            req.user = decoded;

            next();
        } catch (error) {
            throw new AppError(401, "Não autorizado, token inválido.");
        }
    }

    if (!token) {
        throw new AppError(401, "Não autorizado, nenhum token fornecido.");
    }
};

module.exports = { protect };
