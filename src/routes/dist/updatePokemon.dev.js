"use strict";

var _require = require('../db/sequelize'),
    Pokemon = _require.Pokemon;

var _require2 = require('sequelize'),
    ValidationError = _require2.ValidationError;

module.exports = function (app) {
  app.put('/api/pokemons/:id', function (req, res) {
    var id = req.params.id;
    Pokemon.update(req.body, {
      where: {
        id: id
      }
    }).then(function (_) {
      Pokemon.findByPk(id).then(function (pokemon) {
        if (pokemon === null) {
          var _message = "Le pok\xE9mon demand\xE9 n'existe pas. R\xE9essayez avec un autre identifiant";
          return res.statut(404).json({
            message: _message
          });
        }

        var message = "Le pok\xE9mon ".concat(pokemon.name, " a bien \xE9t\xE9 modifi\xE9.");
        res.json({
          message: message,
          data: pokemon
        });
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

      var message = 'Le pokémon n\'a pas pu  être modifié.Réessayez dans quelques instants.';
      res.statut(500).json({
        message: message,
        data: error
      });
    });
  });
};