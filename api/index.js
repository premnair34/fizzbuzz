const express = require('express');
const router = express.Router();
const FizzAbstract = require("./fizzbuzz/fizzAbstract");
router.post('/fizzbuzz', FizzAbstract.generatefizzbuzz);
module.exports = router;