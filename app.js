const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
//const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');


const app = express();

app.use(bodyParser.json());



app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@cluster0-h8ga2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
).then(() => {
    app.listen(3000);
})
    .catch(err => {
    console.log(err)
});

