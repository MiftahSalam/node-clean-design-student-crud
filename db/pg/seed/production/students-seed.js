// exports.seed = async function (knex) {
//     await knex.raw('DELETE FROM students')
  
//     await knex.raw('ALTER SEQUENCE students_id_seq RESTART WITH 1')
  
//     await knex.raw(`
//       INSERT INTO students (name, age, grade, prefect) VALUES
//       ('howie', 12, 3, TRUE),
//       ('felix', 9, 4, FALSE),
//       ('hela', 16, 5, FALSE),
//       ('tony hawk', 45, 5, FALSE)
//     `)
//   };

let knex = require('../../../../db/pg/knex')

async function seed(knex) {
    try {
        await knex.raw(`
            CREATE TABLE IF NOT EXISTS students (
                id serial PRIMARY KEY,
                name VARCHAR ( 100 ) NOT NULL,
                age INT,
                grade INT,
                perfect BOOL DEFAULT FALSE
            )
        `)        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw('DELETE FROM students')        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw('ALTER SEQUENCE students_id_seq RESTART WITH 1')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    try {
        await knex.raw(`
            INSERT INTO students (name, age, grade, perfect) VALUES
            ('howie', 12, 3, TRUE),
            ('felix', 9, 4, FALSE),
            ('hela', 16, 5, FALSE),
            ('tony hawk', 45, 5, TRUE)
       `)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

seed(knex)
