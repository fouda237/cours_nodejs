"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var PokemonModel = require('../models/pokemon');

var pokemons = require('./mock-pokemon');

var UserModel = require('../models/user');

var bcrypt = require('bcrypt');

var sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2'
  },
  logging: false
});
var Pokemon = PokemonModel(sequelize, DataTypes);
var User = UserModel(sequelize, DataTypes);

var initDb = function initDb() {
  return sequelize.sync({
    force: true
  }).then(function (_) {
    pokemons.map(function (pokemon) {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(function (pokemon) {
        return console.log(pokemon.toJSON());
      });
    });
    bcrypt.hash('pikachu', 10).then(function (hash) {
      User.create({
        username: 'pikachu',
        password: hash
      }).then(function (user) {
        return console.log(user.toJSON());
      });
    });
    console.log('La base de donnée a bien été initialisée !');
  });
};

module.exports = {
  initDb: initDb,
  Pokemon: Pokemon,
  User: User
};