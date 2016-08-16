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
        client.query('INSERT INTO books (author, title, published, edition, publisher)' +
            'VALUES ($1, $2, $3, $4, $5)', //"prepared statement"
            [book.author, book.title, book.published, book.edition, book.publisher], // beware SQL injections!
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                }
                res.sendStatus(201);
            });
    });
});

module.exports = router;
