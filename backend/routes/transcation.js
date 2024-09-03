// transcation.js
const express = require('express');
const router = express.Router();


const { getallTranscation, addTranscation } = require('../controller/transcationcontroller');

router.get('/user/:userId', getallTranscation);


router.post('/add', addTranscation);

module.exports = router;
