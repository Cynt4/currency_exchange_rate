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

    let amount = req.body.amount;
    let base = req.body.base;
    let symbols = req.body.symbols;

    let options = {
        url: "https://api.ratesapi.io/api/latest",
        method: "GET",
        qs: {
            base: base,
            symbols: symbols,
        }
    };

    request(options, function(error, response, body) {
        let data = JSON.parse(body);
        let price = data.rates;
        let rate = Object.values(price);

        console.log(rate);

        rate = amount * rate;
        let rounded = rate.toFixed(2);

        res.write(`<h1> ${amount} ${base} is currently worth ${rounded} ${symbols}`)
        res.send();

    });
});

app.listen(3000, function () {
    console.log("Server is running on 3000.");
});