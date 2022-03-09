const bcrypt = require('bcrypt');
const { Users } = require('../models/index')
const express = require('express');
const router = express.Router();

router.post('/signup', signupHangler);


async function signupHangler(req, res) {
    let { username, password } = req.body;
    try {
        let hashedPassword = await bcrypt.hash(password, 5);
        console.log('after hashing >>> ', hashedPassword)
        const user = await Users.create({
            username: username,
            password: hashedPassword
        })
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
    }
}

module.exports = router