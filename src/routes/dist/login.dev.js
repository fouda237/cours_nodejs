"use strict";

var _require = require('../db/sequelize'),
    User = _require.User;

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var privatekey = require('../auth/private_key');

module.exports = function (app) {
  app.post('/api/login', function (req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (!user) {
        var message = "L'utilisateur demand\xE9 n'existe pas.";
        return res.status(404).json({
          message: message
        });
      }

      bcrypt.compare(req.body.password, user.password).then(function (isPasswordValid) {
        if (!isPasswordValid) {
          var _message = "Le mot de passe est incorrect.";
          return res.status(401).json({
            message: _message,
            data: user
          });
        } // jwt


        var token = jwt.sign({
          userId: user.id
        }, privatekey, {
          expiresIn: '24h'
        });
        var message = "L'utilisateur a \xE9t\xE9 connect\xE9 avec succ\xE8s";
        return res.json({
          message: message,
          data: user,
          token: token
        });
      });
    })["catch"](function (error) {
      var message = "L'utilisateur n'a pas pu \xEAtre connect\xE9. R\xE9essayez dans quelques instants.";
      return res.json({
        message: message,
        data: error
      });
    });
  });
};