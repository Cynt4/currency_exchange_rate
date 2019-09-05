//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {

    var base = req.body.base;
    var symbols = req.body.symbols;

    var options = {
        url: "https://api.ratesapi.io/api/latest",
        method: "GET",
        qs: {
            base: base,
            symbols: symbols,
        }
    };

    request(options, function(error, response, body) {
        var data = JSON.parse(body);
        var price = data.rates;
        var rate = Object.values(price);

        console.log(rate);

        res.write(`<h1>1 ${base} is currently worth ${rate} ${symbols}`)
        res.send();

    });
});

app.listen(3000, function () {
    console.log("Server is running on 3000.");
});