"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatTypeDef = `#graphql 
    type Chat {
        id: ID!
        participants: [User!]!
        messages: [Message!]!
        createdAt: String!
        updatedAt: String!
        unreadMessagesCount: Int
    }

    type Mutation {
        createChat(participants: [ID!]!): Chat!
        sendMessage(chatId: ID!, messageText: String!): Message!
    }

    type Query {
        getChats: [Chat!]!
        getChat(chatId: ID!): Chat!
    }
`;
exports.default = chatTypeDef;
