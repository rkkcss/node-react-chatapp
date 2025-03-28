import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { expressMiddleware } from "@apollo/server/express4";

import mergedResolvers from './resolvers/index';
import { ApolloServer } from '@apollo/server';
import mergedTypeDefs from './typeDefs';
import { buildContext } from 'graphql-passport';

const app = express()

const httpServer = http.createServer(app)

const server = new ApolloServer<{}>({  // Itt adjuk meg az üres típust
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

async function startServer() {
  await server.start(); // 🔹 Ezt ténylegesen meg kell hívni

  app.use(
    "/graphql",
    cors({
      origin: "*",
      credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  httpServer.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
}

startServer();

