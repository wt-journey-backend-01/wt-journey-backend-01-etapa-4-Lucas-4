const z = require("zod");
const { validate } = require("./errorHandler");

const newAgenteValidation = (req, res, next) => {
    const newAgente = z.object({
        body: z.object({
            nome: z
                .string({ error: "O nome é obrigatório" })
                .min(1, "O nome é obrigatório"),
            email: z
                .string({ error: "O email é obrigatório" })
                .email("Formato de email inválido"),
            senha: z
                .string({ error: "A senha é obrigatória" })
                .min(6, "A senha deve ter no mínimo 6 caracteres"),
            cargo: z
                .string({ error: "O cargo é obrigatório" })
                .min(1, "O cargo é obrigatório"),
            dataDeIncorporacao: z.coerce
                .date({
                    error: (issue) =>
                        issue.input === undefined
                            ? "A data de incorporação é obrigatória"
                            : "A data de incorporação deve estar no formato YYYY-MM-DD",
                })
                .refine((value) => {
                    const now = new Date();
                    const inputDate = new Date(value);
                    return inputDate <= now;
                }, "A data não pode estar no futuro"),
        }),
    });
    validate(newAgente, req);
    next();
};

// As validações de update permanecem, mas sem a senha.
// A atualização de senha deve ser um processo separado e mais seguro.
const updateAgenteValidation = (req, res, next) => {
    const updateAgente = z.object({
        params: z.object({
            id: z.coerce
                .number({ error: "Id inválido" })
                .int({ error: "Id inválido" })
                .positive({ error: "Id inválido" }),
        }),
        body: z
            .looseObject({
                nome: z
                    .string({ error: "O nome é obrigatório" })
                    .min(1, "O nome é obrigatório"),
                email: z
                    .string({ error: "O email é obrigatório" })
                    .email("Formato de email inválido"),
                cargo: z
                    .string({ error: "O cargo é obrigatório" })
                    .min(1, "O cargo é obrigatório"),
                dataDeIncorporacao: z.coerce
                    .date({
                        error: (issue) =>
                            issue.input === undefined
                                ? "A data de incorporação é obrigatória"
                                : "A data de incorporação deve estar no formato YYYY-MM-DD",
                    })
                    .refine((value) => {
                        const now = new Date();
                        const inputDate = new Date(value);
                        return inputDate <= now;
                    }, "A data não pode estar no futuro"),
            })
            .refine((data) => data.id === undefined, {
                error: "O id não pode ser atualizado",
            })
            .refine((data) => data.senha === undefined, {
                error: "A senha não pode ser atualizada por esta rota",
            }),
    });
    validate(updateAgente, req);
    next();
};

const partialUpdateAgenteValidation = (req, res, next) => {
    const updateAgente = z.object({
        params: z.object({
            id: z.coerce
                .number({ error: "Id inválido" })
                .int({ error: "Id inválido" })
                .positive({ error: "Id inválido" }),
        }),
        body: z
            .strictObject(
                {
                    nome: z.optional(
                        z.string().min(1, "O nome não pode ser vazio")
                    ),
                    email: z.optional(
                        z.string().email("Formato de email inválido")
                    ),
                    cargo: z.optional(
                        z.string().min(1, "O cargo não pode ser vazio")
                    ),
                    dataDeIncorporacao: z.optional(
                        z.coerce
                            .date({
                                error: "A data de incorporação deve estar no formato YYYY-MM-DD",
                            })
                            .refine((value) => {
                                const now = new Date();
                                const inputDate = new Date(value);
                                return inputDate <= now;
                            }, "A data não pode estar no futuro")
                    ),
                },
                {
                    error: (err) => {
                        if (err.keys.length > 0) {
                            return `Alguns campos não são válidos para a entidade agente: ${err.keys.join(
                                ", "
                            )}`;
                        }
                        return err;
                    },
                }
            )
            .refine((data) => data.id === undefined, {
                error: "O id não pode ser atualizado",
            })
            .refine((data) => data.senha === undefined, {
                error: "A senha não pode ser atualizada por esta rota",
            }),
    });
    validate(updateAgente, req);
    next();
};

module.exports = {
    newAgenteValidation,
    updateAgenteValidation,
    partialUpdateAgenteValidation,
};
