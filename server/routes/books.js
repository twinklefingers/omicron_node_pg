var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron'; //case sensitive
//5432 default port of PG databases

router.get('/', function(req, res) {
    // Retrieve books from database
    pg.connect(connectionString, function(err, client, done) {

        if (err) {
            res.sendStatus(500);
        }

        client.query('SELECT * FROM books', function(err, result) { //second param always holds results, no matter what it's called
            done(); //only 10 query connections can be open at once, so call done or the connections will stay open and the 11th query wont work
            if (err) {
                res.sendStatus(500);
            }
            res.send(result.rows);
        });
    });
});

router.post('/', function(req, res) {
    var book = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.quert('INSERT INTO books (author, title, published)' +
            'VALUES ($1, $2, $3)');
    });
});

module.exports = router;
