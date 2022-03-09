'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth')

router.post('/signin', basicAuth, signinHandler);

async function signinHandler(req, res) {
    await res.status(200).json(req.user);
}

module.exports = router