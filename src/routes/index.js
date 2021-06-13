const express = require('express');

const router = express.Router();
const microdadoRoutes = require('./microdado-route');

router.get('/online', (req, res) => res.json(new Date()));

router.use('/microdado', microdadoRoutes(express));

module.exports = router;
