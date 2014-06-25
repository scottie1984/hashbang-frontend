var express = require('express');
var app = express();

port = process.argv[2] || 8000;

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
       app.use(
        "/",
        express.static(__dirname)
    );
}

app.listen(port);

console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");


