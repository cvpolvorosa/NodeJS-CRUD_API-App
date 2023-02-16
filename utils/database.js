require('dotenv/config')
const Sequelize = require('sequelize')

//init db
const db = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host:process.env.HOST,
        dialect:'postgres', //mysql, postgres,sqlite,mariadb...
        port: 5432,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }
    },
);

module.exports = db;