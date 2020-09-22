var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
const http     = require('http');
var fs         = require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyParser.urlencoded({ extended: true })); 




// npm install --save neo4j-driver
var neo4j = require('neo4j-driver');
var driver = neo4j.driver('bolt://35.175.130.224:33148', neo4j.auth.basic('neo4j', 'purchases-equivalents-tension'));

var query = 
  "MATCH (player:Person) \
WHERE player.name = 'Elaine' \
RETURN player.name";


//  "MATCH (n) \
//   RETURN ID(n) as id \
//   LIMIT $limit";

var params = {"limit": 10};

var session = driver.session();

session.run(query, params)
  .then(function(result) {
    result.records.forEach(function(record) {
        console.log(record.get('player.name'));
    })
  })
  .catch(function(error) {
    console.log(error);
  });




app.use(express.static('./public'));
app.listen(8080, function() {
    console.log('Admin page at     http://127.0.0.1:8080/index.html');
});


