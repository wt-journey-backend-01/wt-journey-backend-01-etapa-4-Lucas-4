/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("usuarios").del();
    await knex("usuarios").insert([
        {
            nome: "Pablo Souza",
            email: "pablo54@email.com",
            senha: "487939hr7fg8743!@#!@#%$vdfvd#",
        },
        {
            nome: "LeandroTorres",
            email: "leo342@email.com",
            senha: "jr9843hr943hr43!vfdv@#%$#%#FDFDVBDFV",
        },
    ]);
};
