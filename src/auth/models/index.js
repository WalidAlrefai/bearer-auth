'use srtict';
const { Sequelize, DataTypes } = require('sequelize');
const Users = require('./user-model');
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
    db: sequelize,
    Users: Users(sequelize, DataTypes),
}