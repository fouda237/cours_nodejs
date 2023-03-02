const express=require('express')

const bodyparser=require('body-parser')
const favicon=require('serve-favicon')
const sequelize=require('./src/db/sequelize')
const app=express()
const port=process.env.PORT || 3000
app
.use(favicon(__dirname+'/favicon/favicon.ico'))
.use(bodyparser.json())
// app.use((req,res,next)=>{
//     console.log(`URL:${req.url}`)
//     next()
//    })
sequelize.initDb()
app.get('/',(req,res)=>{ 
  res.json(`Hello, Heroku: salut`)
})
// Ici, nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPK')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)
//on ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message='Impossible de trouver la ressources deranges! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})
app.listen(port,()=>console.log(`Notre  application Node est démarrée sur : http://localhost:${port}`))