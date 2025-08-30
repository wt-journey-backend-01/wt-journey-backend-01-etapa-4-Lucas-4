const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController");
const {
    updateAgenteValidation,
    partialUpdateAgenteValidation,
} = require("../utils/agentesValidations");
const { protect } = require("../utils/auth");

// Aplica o middleware de proteção a todas as rotas neste arquivo
router.use("/agentes", protect);

/**
 * @openapi
 * /agentes/{id}/casos:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna uma lista de casos referente a um agente
 *    description: Retorna uma lista de casos com base no identificador do agente
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Lista de casos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Caso'
 *      404:
 *        description: Nenhum agente encontrado para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get("/agentes/:id/casos", agentesController.getCasosByAgenteId);

/**
 * @openapi
 * /agentes/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna um agente específico
 *    description: Retorna os detalhes de um agente pelo seu id
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      200:
 *        description: Detalhes do agente retornados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser válido
 *      404:
 *        description: Nenhum agente encontrado para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.get("/agentes/:id", agentesController.getAgenteById);

/**
 * @openapi
 * /agentes:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos os agentes
 *    description: Retorna uma lista de todos os agentes disponíveis
 *    tags: [Agentes]
 *    responses:
 *      200:
 *        description: Lista todos os agentes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Agente'
 */
router.get("/agentes", agentesController.getAllAgentes);

/**
 * @openapi
 * /agentes/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Atualiza agente
 *    description: Atualiza um agente com os dados fornecidos
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      200:
 *        description: Agente atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O cargo é obrigatório
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.put(
    "/agentes/:id",
    updateAgenteValidation,
    agentesController.updateAgente
);

/**
 * @openapi
 * /agentes/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Atualiza agente
 *    description: Atualiza um agente parcialmente com os dados fornecidos
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NovoAgente'
 *    responses:
 *      200:
 *        description: Agente atualizado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agente'
 *      400:
 *        description: Parâmetros inválidos
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O nome não pode ser vazio
 *      404:
 *        description: O agente definido não existe na base de dados
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.patch(
    "/agentes/:id",
    partialUpdateAgenteValidation,
    agentesController.updatePartialAgente
);

/**
 * @openapi
 * /agentes/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Apaga um agente específico
 *    description: Remove um agente da base de dados
 *    tags: [Agentes]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *    responses:
 *      204:
 *        description: Agente removido com sucesso
 *      400:
 *        description: Identificador inválido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Parâmetros inválidos
 *                errors:
 *                  type: string
 *                  example:
 *                    - O parâmetro "id" deve ser válido
 *      404:
 *        description: Nenhum agente para o id especificado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum agente encontrado para o id especificado
 *                errors:
 *                  type: string
 *                  example: []
 */
router.delete("/agentes/:id", agentesController.deleteAgente);

/**
 * @openapi
 * components:
 *  schemas:
 *    Agente:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 1
 *        nome:
 *          type: string
 *          example: "Carlos Meireles"
 *        email:
 *          type: string
 *          format: email
 *          example: "carlos.meireles@policia.gov"
 *        dataDeIncorporacao:
 *          type: string
 *          format: date
 *          example: "2025-07-22"
 *        cargo:
 *          type: string
 *          example: delegado
 *    NovoAgente:
 *      type: object
 *      properties:
 *        nome:
 *          type: string
 *          example: "Carlos Meireles"
 *        email:
 *          type: string
 *          format: email
 *          example: "carlos.meireles@policia.gov"
 *        senha:
 *          type: string
 *          format: password
 *          example: "senhaSegura123"
 *        dataDeIncorporacao:
 *          type: string
 *          format: date
 *          example: "2025-07-22"
 *        cargo:
 *          type: string
 *          example: delegado
 */

module.exports = router;
