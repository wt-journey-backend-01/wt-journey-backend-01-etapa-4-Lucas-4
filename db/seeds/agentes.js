/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("agentes").del();
    await knex("agentes").insert([
        {
            nome: "Pedro Santos",
            dataDeIncorporacao: "1987-01-09",
            cargo: "delegado",
        },
        {
            nome: "Paulo Silva",
            dataDeIncorporacao: "2018-01-01",
            cargo: "inspetor",
        },
    ]);
};
