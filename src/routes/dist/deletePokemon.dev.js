"use strict";

var _require = require('../db/sequelize'),
    Pokemon = _require.Pokemon;

var auth = require('../auth/auth');

module.exports = function (app) {
  app["delete"]('/api/pokemons/:id', auth, function (req, res) {
    Pokemon.findByPk(req.params.id).then(function (pokemon) {
      if (pokemon === null) {
        var message = "Le pok\xE9mon demand\xE9 n'existe pas. R\xE9essayez avec un autre identifiant";
        return res.status(404).json({
          message: message
        });
      }

      var pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: {
          id: pokemon.id
        }
      }).then(function (_) {
        var message = "Le pok\xE9mon avec l'identifiant n\xB0".concat(pokemonDeleted.id, " a bien \xE9t\xE9 supprim\xE9.");
        res.json({
          message: message,
          data: pokemonDeleted
        });
      });
    })["catch"](function (error) {
      var message = 'Le pokémon n\'a pas pu  être modifié.Réessayez dans quelques instants.';
      res.statut(500).json({
        message: message,
        data: error
      });
    });
  });
};