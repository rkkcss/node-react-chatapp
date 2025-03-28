"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
  type Mutation {
    login(email: String!, password: String!): String
    register(name: String!, email: String!, password: String!): String
    createBlog(title: String!, content: String!, authorId: String!): Blog
  }

  type User {
    id: Int!
    name: String!
    email: String!
    blogs: [Blog!]
  }

  type Blog {
    id: Int!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    getBlogs: [Blog!]
    getBlogById(id: Int!): Blog
    getUserByEmail(email: String!): User
  }
`);
