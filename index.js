var express = require('express');
const apiRouter = require('./server');
var app = express();

app.use(express.json());
apiRouter(app);


app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  console.log("hola tú");

});
