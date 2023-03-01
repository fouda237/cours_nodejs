"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../db/sequelize'),
    Pokemon = _require.Pokemon;

var _require2 = require('sequelize'),
    Op = _require2.Op;

var auth = require('../auth/auth');

module.exports = function (app) {
  app.get('/api/pokemons', auth, function (req, res) {
    if (req.query.name) {
      var name = req.query.name;
      var limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        var _message = "Le terre de recherche  doit contenir au moins 2 carat\xE8res";
        return res.status(400).json({
          message: _message
        });
      }

      return Pokemon.findAndCountAll({
        where: {
          name: _defineProperty({}, Op.like, "%".concat(name, "%"))
        },
        order: ['name'],
        limit: limit
      }).then(function (_ref) {
        var count = _ref.count,
            rows = _ref.rows;
        var message = "Il y a ".concat(count, " pok\xE9mons qui correspondant au terrre de recherche ").concat(name);
        res.json({
          message: message,
          data: rows
        });
      });
    } else {
      var _limit = parseInt(req.query.limit);

      Pokemon.findAll({
        order: ['name'],
        limit: _limit
      }).then(function (pokemons) {
        var message = 'La liste des pokémons a bien été récupérée.';
        res.json({
          message: message,
          data: pokemons
        });
      })["catch"](function (error) {
        message = "La liste des pokémons n'a pas pu être récupérée, Ressayer dans quelques instants.";
        res.status(500).json({
          message: message,
          data: error
        });
      });
    }
  });
};