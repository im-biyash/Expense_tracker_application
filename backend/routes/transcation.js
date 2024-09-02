
const express = require('express')
const router = express.Router();

const {getAllTransactions,addTransaction} = require('../controller/transcationcontroller')

router.get('/getall',getAllTransactions);

router.post('/add',addTransaction);

module.exports = router;