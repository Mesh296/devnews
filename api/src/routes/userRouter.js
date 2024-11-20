const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json("User Router");
})

module.exports = router