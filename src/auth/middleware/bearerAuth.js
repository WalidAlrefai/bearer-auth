'use strict';
const { Users } = require('../models/index');
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET;

module.exports = async (req, res, next) => {
    if (req.headers['authorization']) {
        let bearerHeaderParts = req.headers.authorization.split(' ');
        let token = bearerHeaderParts.pop();
        try {
            const parsedToken = jwt.verify(token, SECRET);
            const user = await Users.findOne({ where: { username: parsedToken.username } });
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(403).send('invalid token');
            }
        } catch {
            res.status(403).send('token is invalid')
        }
        
    } else {
        res.status(403).send('authorization is not valid');
    }
}