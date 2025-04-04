import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http'
import express from 'express'
import cors from 'cors'
import { expressMiddleware } from "@apollo/server/express4";
import session from "express-session";
import { Request, Response } from 'express';

import mergedResolvers from './resolvers/index';
import mergedTypeDefs from './typeDefs';
import { ApolloServer } from '@apollo/server';
import { buildContext } from 'graphql-passport';

const app = express()
const cookieParser = require('cookie-parser');
const httpServer = http.createServer(app)

interface MyContext {
  req: Request;
  res: Response;
}

const server = new ApolloServer<MyContext>({  // Itt adjuk meg az üres típust
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

app.use(cookieParser());

async function startServer() {
  await server.start();

  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:5173",
      credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<MyContext> => {
        return { req, res };
      }
    })
  );

  httpServer.listen(4000, () => {
    console.log("Server running at http://localhost:4000/graphql");
  });
  app.use(
    session({
      secret: "your-secret-key", // Titkos kulcs a session titkosításához
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );
}


startServer();

