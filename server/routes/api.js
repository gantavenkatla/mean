const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
        if (err) return console.log(err);

        closure(client.db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((client) => {
      var db=client.db;
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
