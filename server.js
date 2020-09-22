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







function addRecord(req,res)
{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Password-123',
        database : 'nomuraLifehacks'
    });
    connection.connect();
    connection.query(req.body.QUERY, function(err, rows, fields) {
        if (!err)
        {
            console.log('The solution is: ', rows);
            res.send(rows);
        }
        else
        {
            console.log('Error while performing Query.'+err);
            res.send('[ERROR] "'+err+'"');
        }
    });
    connection.end();
}
app.post('/query', function(req, res) {addRecord(req,res);});




app.use(express.static('./public'));
app.listen(8080, function() {
    console.log('Admin page at     http://127.0.0.1:8080/index.html');
    console.log('Homepage at       http://127.0.0.1:8080/home.html');
});


