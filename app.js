const express = require('express')
const {graphqlHTTP} = require('express-graphql')
require('dotenv').config();
const mongoose = require('mongoose')
const schema = require('./schema/schema')
// const testSchema = require('./schema/types_schema')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo');
})

const cors = require('cors')
const port = process.env.PORT || 4000
 
const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(port, () => { // localhost:4000
    console.log('Listening for requests on my awesome port 4000');
})