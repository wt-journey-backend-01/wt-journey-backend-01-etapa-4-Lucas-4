/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// We need bcrypt to hash the passwords for our seed users
const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("agentes").del();

    // It's good practice to use a salt for hashing
    const salt = await bcrypt.genSalt(10);

    // Create hashed passwords for each agent
    const hashedPassword1 = await bcrypt.hash("password123", salt);
    const hashedPassword2 = await bcrypt.hash("password456", salt);
    const hashedPassword3 = await bcrypt.hash("password789", salt);

    await knex("agentes").insert([
        {
            nome: "Larissa Moura",
            // Add the new required fields
            email: "larissa.moura@policia.gov",
            senha: hashedPassword1,
            dataDeIncorporacao: "2005-03-22",
            cargo: "delegado",
        },
        {
            nome: "Carlos Meireles",
            // Add the new required fields
            email: "carlos.meireles@policia.gov",
            senha: hashedPassword2,
            dataDeIncorporacao: "2000-01-05",
            cargo: "inspetor",
        },
        {
            nome: "Bruno Tavares",
            // Add the new required fields
            email: "bruno.tavares@policia.gov",
            senha: hashedPassword3,
            dataDeIncorporacao: "2023-01-15",
            cargo: "inspetor",
        },
    ]);
};
