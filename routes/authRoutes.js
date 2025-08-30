const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { newAgenteValidation } = require("../utils/agentesValidations");

/**
 * @openapi
 * /register:
 *  post:
 *    summary: Registra um novo agente (usuário)
 *    description: Cria um novo agente com nome, email, senha e outros detalhes. A senha é armazenada de forma segura usando hash.
 *    tags: [Autenticação]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      201:
 *        description: Agente registrado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Agente registrado com sucesso!"
 *                agente:
 *                  $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos ou email já em uso.
 */
router.post("/register", newAgenteValidation, authController.register);

/**
 * @openapi
 * /login:
 *  post:
 *    summary: Autentica um agente e retorna um token JWT
 *    description: Realiza o login de um agente usando email e senha, retornando um token de autenticação para acesso a rotas protegidas.
 *    tags: [Autenticação]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - senha
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: "larissa.moura@policia.gov"
 *              senha:
 *                type: string
 *                format: password
 *                example: "senhaSegura123"
 *    responses:
 *      200:
 *        description: Login bem-sucedido. Retorna informações do agente e o token JWT.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Login bem-sucedido!"
 *                agente:
 *                  $ref: '#/components/schemas/Agente'
 *                token:
 *                  type: string
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *      400:
 *        description: Email ou senha não fornecidos.
 *      404:
 *        description: Credenciais inválidas.
 */
router.post("/login", authController.login);

module.exports = router;
