/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("casos").del();
    await knex("casos").insert([
        {
            titulo: "Invasão de residência",
            descricao:
                "Ocorrido no bairro Vila Nova às 02h. Três indivíduos arrombaram a porta da residência e levaram joias e dinheiro. A vítima, a dona da casa, estava presente e foi ameaçada.",
            status: "aberto",
            agente_id: 3,
        },
        {
            titulo: "Estelionato",
            descricao:
                "A vítima, um idoso, foi enganado por um golpe de investimento. O estelionatário prometeu altos rendimentos e levou uma quantia em dinheiro. A vítima não soube identificar o golpista.",
            status: "solucionado",
            agente_id: 2,
        },
    ]);
};
