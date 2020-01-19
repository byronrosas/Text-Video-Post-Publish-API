require('dotenv').config({ path: './sample.env' });
const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const post = require('./controller/post-controller.js');

const resolvers = {
  Query: {
    postList: post.list,
    postById: post.byId
  },
  Mutation: {
    postAdd: post.add,
  }
};

const file = path.join(__dirname,'/schema/schema.graphql');

const server = new ApolloServer({
  typeDefs: fs.readFileSync(file, 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log('Error', error);
    return error;
  },  
  playground: true,  
  introspection: true, 
});

function runAPI(app) {
 
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  // middleware apollo
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { runAPI };