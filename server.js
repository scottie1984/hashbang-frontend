var express = require('express');
var app = express();

port = process.env.PORT || 8000;

app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/templates', express.static('app/templates'));
app.use('/views', express.static('app/views'));


app.get('', function (req, res) {
    res.sendfile('./app/public.html');
});

app.use(require('prerender-node').set('prerenderToken', '5QUDyBsGmfyDFqVugAQ2'));


app.listen(port);

console.log("Express server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");

