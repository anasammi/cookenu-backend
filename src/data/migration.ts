import { BaseDatabase } from "./BaseDatabase";
const users = require('./users.json')
const recipes = require('./recipes.json')

const database = new BaseDatabase().getConnection()

const createTables = async ()=> {
    await database.raw(`
        CREATE TABLE IF NOT EXISTS user_cookenu(
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS recipe_cookenu(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            user_id VARCHAR(255),
            FOREIGN KEY (user_id) REFERENCES user_cookenu(id)
        );
    `)

    console.log("Tabelas criadas com sucesso!")
}

const populateTables = async() => {
    await database("user_cookenu")
        .insert(users)
    await database("recipe_cookenu")
        .insert(recipes)
}

createTables()
.then(() => populateTables())
.then(() => database.destroy())
.then(() => console.log("Tudo certo! Tabelas criadas e populadas."))