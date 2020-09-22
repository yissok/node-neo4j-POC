var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var mysql      = require('mysql');
const http     = require('http');
var fs         = require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.urlencoded({ extended: true })); 

function checkIfPlayerWithNameExists(req,res)
{
    console.log('###########################');
    console.log('###########################');
    console.log('###########################');
    console.log('The req: ', req.body.QUERY);
    console.log('###########################');
    console.log('###########################');
    console.log('###########################');
    // npm install --save neo4j-driver
    var neo4j = require('neo4j-driver');
    var driver = neo4j.driver('bolt://35.175.130.224:33148', neo4j.auth.basic('neo4j', 'purchases-equivalents-tension'));

    var query = 
      "MATCH (player:Person) \
    WHERE player.name = '"+req.body.QUERY+"' \
    RETURN player.name";


    //  "MATCH (n) \
    //   RETURN ID(n) as id \
    //   LIMIT $limit";

    var params = {"limit": 10};

    var session = driver.session();

    session.run(query, params)
      .then(function(result) {
        result.records.forEach(function(record) {
            var playerName=record.get('player.name');
            console.log(playerName," found!");
            res.status(200).send('OK');
        })
        if(result.records.length==0)
        {
            console.log(req.body.QUERY,"not found!");
            res.status(404).send('Not Found')
        }
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
      });
}

app.post('/query', function(req, res) {checkIfPlayerWithNameExists(req,res);});


app.use(express.static('./public'));
app.listen(8080, function() {
    console.log('Admin page at     http://127.0.0.1:8080/index.html');
});


