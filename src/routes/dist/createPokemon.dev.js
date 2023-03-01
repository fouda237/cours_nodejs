"use strict";

var _require = require('../db/sequelize'),
    Pokemon = _require.Pokemon;

var auth = require('../auth/auth');

var _require2 = require('sequelize'),
    ValidationError = _require2.ValidationError,
    UniqueConstraintError = _require2.UniqueConstraintError;

module.exports = function (app) {
  app.post('/api/pokemons', auth, function (req, res) {
    Pokemon.create(req.body).then(function (pokemon) {
      var message = "Le pok\xE9mon ".concat(req.body.name, " a bien \xE9t\xE9 cr\xE9e.");
      res.json({
        message: message,
        data: pokemon
      });
    })["catch"](function (error) {
      if (error instanceof ValidationError) {
        return res.statut(400).json({
          message: error.message,
          data: error
        });
      }

      if (error instanceof UniqueConstraintError) {
        return res.statut(400).json({
          message: error.message,
          data: error
        });
      }

      var message = 'Le pokémon n\'a pas pu  être ajouté.Réessayez dans quelques instants.';
      res.statut(500).json({
        message: message,
        data: error
      });
    });
  });
};