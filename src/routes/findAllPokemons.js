const { Pokemon } = require('../db/sequelize')
 const {Op}=require('sequelize') 
 const auth=require('../auth/auth')
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if(req.query.name){
      const name=req.query.name
      const limit=parseInt(req.query.limit) ||5
      if (name.length < 2 ){
        const message=`Le terre de recherche  doit contenir au moins 2 caratères`
        return res.status(400).json({message})
      }
      return Pokemon.findAndCountAll({where:{
        name:{// 'name' est le propriété du modèle pokémon
          [Op.like]:`%${name}%` // 'name' est le critère de la recherche
        }
      },
    order:['name'],
    limit:limit
    })
      .then(({count,rows}) => {
        const message = `Il y a ${count} pokémons qui correspondant au terrre de recherche ${name}`
        res.json({ message, data: rows })
      })
    }else{
      const limit=parseInt(req.query.limit)
      Pokemon.findAll({order:['name'], limit:limit})
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error=>{
        message="La liste des pokémons n'a pas pu être récupérée, Ressayer dans quelques instants."
        res.status(500).json({message,data:error})
      })
    }
   
  })
}