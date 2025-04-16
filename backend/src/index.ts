import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import http from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import { expressMiddleware } from "@apollo/server/express4";
import session from "express-session";
import { Request, Response } from 'express';

import mergedResolvers from './resolvers/index';
import mergedTypeDefs from './typeDefs';
import { ApolloServer } from '@apollo/server';
import { initSocket } from './websocket/socket';

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production"
});

const app = express()
const cookieParser = require('cookie-parser');
const httpServer = http.createServer(app)

export interface CustomContext {
  req: Request;
  res: Response;
}

const server = new ApolloServer<CustomContext>({  // Itt adjuk meg az üres típust
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
      origin: process.env.NODE_ENV === "production" ? "https://rkkcss.up.railway.app:4173" : "http://localhost:5173",
      credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<CustomContext> => {
        return { req, res };
      }
    })
  );

  initSocket(httpServer);

  httpServer.listen(4000, () => {
    console.log(`Server running at ${process.env.CLIENT_URL}`);
    console.log("Server mode: ", process.env.NODE_ENV);
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

