"use strict";

var express = require('express');

var bodyparser = require('body-parser');

var favicon = require('serve-favicon');

var sequelize = require('./src/db/sequelize');

var app = express();
var port = process.env.PORT || 3000;
app.use(favicon(__dirname + '/favicon/favicon.ico')).use(bodyparser.json()); // app.use((req,res,next)=>{
//     console.log(`URL:${req.url}`)
//     next()
//    })

sequelize.initDb();
app.get('/', function (req, res) {
  res.json("Hello, Heroku: salut");
}); // Ici, nous placerons nos futurs points de terminaison

require('./src/routes/findAllPokemons')(app);

require('./src/routes/findPokemonByPK')(app);

require('./src/routes/createPokemon')(app);

require('./src/routes/updatePokemon')(app);

require('./src/routes/deletePokemon')(app);

require('./src/routes/login')(app); //on ajoute la gestion des erreurs 404


app.use(function (_ref) {
  var res = _ref.res;
  var message = 'Impossible de trouver la ressources deranges! vous pouvez essayer une autre URL.';
  res.status(404).json({
    message: message
  });
});
app.listen(port, function () {
  return console.log("Notre  application Node est d\xE9marr\xE9e sur : http://localhost:".concat(port));
});