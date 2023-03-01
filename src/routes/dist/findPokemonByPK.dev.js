"use strict";

var _require = require('../db/sequelize'),
    Pokemon = _require.Pokemon;

var auth = require('../auth/auth');

module.exports = function (app) {
  app.get('/api/pokemons/:id', auth, function (req, res) {
    Pokemon.findByPk(req.params.id).then(function (pokemon) {
      var message = 'Un pokémon a bien été trouvé.';
      res.json({
        message: message,
        data: pokemon
      });
    });
  });
};