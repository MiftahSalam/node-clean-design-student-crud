let config = require('./config')

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'clean_node_example',
            port: 5432,
            ssl: {
                rejectUnauthorized: false,
            }
        },
        migrations: {
            directory: __dirname + '/db/pg/migrations'
        },
        seed: {
            directory: __dirname + '/db/pg/seeds/development'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: config.pg.HOST,
            user: config.pg.USER,
            password: config.pg.PASSWORD,
            database: config.pg.DATABASE,
            port: config.pg.PORT,
            ssl: {
                rejectUnauthorized: false
            }
        },
        migrations: {
            directory: __dirname + '/db/pg/migrations'
        },
        seeds: {
            directory: __dirname + '/db/pg/seeds/production'
        }
    }
}