var express = require('express');
//var hookshot = require('hookshot');
var pg = require('pg');
var spawn = require('child_process').spawn;

function shspawn(command) {
   spawn('sh', ['-c', command], { stdio: 'inherit' });
}

cnxString = process.env.DATABASE_URL ||  "tcp://nico:astiko@localhost/gsv_cutter";
client = new pg.Client(cnxString);
client.connect();

var app = express();

app.get('/', function (request, response) {
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
      //console.log(result.rows[0].theTime);
      response.send("Hello World , time from the postgresql db:" + result.rows[0].theTime );
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
  })
});

app.get('/my-github-hook',function(req, res) {
  shspawn("git pull && npm install");
  res.send("");
});




app.get('/coucou/:name', function(req, res) {
    var result = 'Coucou ' + req.params.name + '<br />' +
        'Essaye de changer le nom après coucou/';
    res.send(result);
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Listening on ' + port);
});