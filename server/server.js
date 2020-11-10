const express =  require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then( () => { console.log("DB connected") } )
    .catch( (err) => console.log("DB ERROR:", err) )

// Importing route
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
// App middlewares
app.use(morgan( 'dev'))
app.use(bodyParser.json())
// app.use(cors()) //Allow all origins. But you may want to restrict
if( process.env.NODE_ENV === "development" )    
    app.use( cors( {origin: `http://localhost:3000` } ) )
if( process.env.NODE_ENV === "production" ){
    app.use( cors() )
    app.use(express.static('../client/build'))
}

// Middleware
app.use( "/api", authRoutes )
app.use( "/api", userRoutes )
const port = process.env.port || 8000
// app.listen( port, ()=>{
//     console.log( `App runnign on port ${port} - ${process.env.NODE_ENV}` )
// })
app.listen(process.env.PORT || 8000, function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})