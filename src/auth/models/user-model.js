'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || "walid";

'use strict';
const Users =(sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
        type: DataTypes.VIRTUAL,
        get() {     
                return jwt.sign({ username: this.username }, SECRET);  
        }
    }
})

module.exports=Users


