const { Sequelize } = require("sequelize");

const todoList = new Sequelize({
    host : 'localhost',
    database : 'todos',
    port : '5432',
    username : 'postgres',
    password: '935321029',
    dialect : 'postgres'
})

module.exports = todoList;