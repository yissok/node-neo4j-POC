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
var driver = neo4j.driver('bolt://54.87.236.230:34038', neo4j.auth.basic('neo4j', 'friends-axis-conduct'));

    var query = 
      "MATCH pp =(m:Match)<-[sg:SCORED_GOAL]-(person:Person) WITH collect(sg) AS listOfGoalsPerMatch, person.name AS plName RETURN size(listOfGoalsPerMatch) AS goals,plName ORDER BY goals DESC SKIP "+req.body.QUERY+" LIMIT 9";


    //  "MATCH (n) \
    //   RETURN ID(n) as id \
    //   LIMIT $limit";

    var params = {"limit": 10};

    var session = driver.session();

    session.run(query, params)
      .then(function(result) {
        var response = JSON.stringify(result.records);
        console.log(response);
        res.send(response)
      })
      .catch(function(error) {
        console.log(error);
      });
}

app.post('/query', function(req, res) {checkIfPlayerWithNameExists(req,res);});


app.use(express.static('./public'));
app.listen(8080, function() {
    console.log('Admin page at     http://127.0.0.1:8080/index.html');
});

//checkIfPlayerWithNameExists("","");
