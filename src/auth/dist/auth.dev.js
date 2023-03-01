"use strict";

var jwt = require('jsonwebtoken');

var privateKey = require('../auth/private_key');

module.exports = function (req, res, next) {
  var authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    var message = "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-t\xEAte de la requ\xEAte.";
    return res.status(401).json({
      message: message
    });
  }

  var token = authorizationHeader.split(' ')[1];
  var decodedToken = jwt.verify(token, privateKey, function (error, decodedToken) {
    if (error) {
      var _message = "L'utilisateur n'est pas autoris\xE9 \xE0 acc\xE8der \xE0 cette ressource.";
      return res.status(401).json({
        message: _message,
        data: error
      });
    }

    var userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      var _message2 = "L'identifiant de l'utilisateur est invalide.";
      res.status(401).json({
        message: _message2
      });
    } else {
      next();
    }
  });
};