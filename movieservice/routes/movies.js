// movies.js

var express = require('express');

var router = express.Router();
var db = require('../database');

router.get("/show", function(req, res) {
    db.Movies.findAll()
        .then( movies => {
            res.status(200).send(JSON.stringify(movies));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/index/:id", function(req, res) {
    db.Movies.findByPk(req.params.id)
        .then( movie => {
            res.status(200).send(JSON.stringify(movie));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});



router.post("/insert", function(req, res) {
    db.Movies.create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        release_date: req.body.release_date,
        duration: req.body.duration,
        rating: req.body.rating,
        genre: req.body.genre
        })
        .then( movie => {
            res.status(200).send(JSON.stringify(movie));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/delete/:id", function(req, res) {
    db.Movies.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;