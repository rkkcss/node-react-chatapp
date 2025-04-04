"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authDef = `#graphql 
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        chatRooms: [Participant]
        createdAt: String!
        updatedAt: String!
    }

    type AuthResponse {
        message: String
    }

    type Mutation {
        login(email: String!, password: String!): String!
        register(name: String!, email: String!, password: String!): String!
        logout: String!
    }

    type Query {
        getUserByEmail(email: String!): User
        getUserById(id: ID!): User
        me: User
    }
`;
exports.default = authDef;
