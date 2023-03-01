const { Pokemon } = require('../db/sequelize')
const auth=require('../auth/auth')
const { ValidationError, UniqueConstraintError} = require('sequelize')  
module.exports = (app) => {
  app.post('/api/pokemons',auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
    .catch(error=>{
      if(error instanceof ValidationError){
        return res.statut(400).json({message:error.message,data:error})
      }
      if(error instanceof UniqueConstraintError){
        return res.statut(400).json({message:error.message,data:error})
      }
      const message='Le pokémon n\'a pas pu  être ajouté.Réessayez dans quelques instants.'
      res.statut(500).json({message,data:error})
    })
  })
}