let knex = require('../../../../db/pg/knex')

async function seed(knex) {
    try {
        await knex.raw(`
            CREATE TABLE IF NOT EXISTS teachers (
                id serial PRIMARY KEY,
                name VARCHAR ( 100 ) NOT NULL,
                subject VARCHAR ( 100 ) NOT NULL,
                tenure BOOL DEFAULT FALSE
            )
        `)        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw('DELETE FROM teachers')        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw('ALTER SEQUENCE teachers_id_seq RESTART WITH 1')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw(`
            INSERT INTO teachers (name, subject, tenure) VALUES
            ('robert', 'poetry', TRUE),
            ('kanye west', 'maths', TRUE),
            ('robert martin', 'comp sci', FALSE)
        `)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

seed(knex)
