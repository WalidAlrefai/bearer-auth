'use strict'

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearerAuth');
router.get('/secretstuff',bearerAuth, secretHandler)

function secretHandler(req, res) {
 res.status(200).json(req.user);
}




module.exports = router