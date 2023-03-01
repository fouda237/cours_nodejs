"use strict";

var validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom est déjà pris.'
      },
      validate: {
        notEmpty: {
          msg: 'Le nom ne peut pas être vide.'
        },
        notNull: {
          msg: 'Le nom est une propriété requise.'
        }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Utilisez uniquement des nombres entiers pour les points de vie'
        },
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieurs ou égales à 0'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être intérieurs ou égales à 999'
        },
        notNull: {
          msg: 'Les point de vie sont une propriété requise.'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts'
        },
        min: {
          args: [0],
          msg: 'Les points de dégâts doivent être supérieurs ou égales à 0'
        },
        max: {
          args: [99],
          msg: 'Les points de dégâts doivent être intérieurs ou égales à 99'
        },
        notNull: {
          msg: 'Les point de dégâts sont une propriété requise.'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'Utilisez uniquement une URL valide pour l\'image.'
        },
        notNull: {
          msg: 'L\image est une propriété requise.'
        }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function get() {
        return this.getDataValue('types').split(',');
      },
      set: function set(types) {
        this.setDataValue('types', types.join());
      },
      validate: {
        isTypesValid: function isTypesValid(value) {
          if (!value) {
            throw new Error('Un pokemon doit au moins avoir un type.');
          }

          if (value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux pas avoir plus de trois types.');
          }

          value.split(',').forEach(function (type) {
            if (!validTypes.includes(type)) {
              throw new Error("Le type d'un pok\xE9mon doit appartenir \xE0 la liste suivante: ".concat(validTypes));
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};