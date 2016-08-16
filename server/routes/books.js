var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Retrieve books from database
    res.send({
        message: 'OK'
    });
});

module.exports = router;
