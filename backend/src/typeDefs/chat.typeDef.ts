const chatTypeDef = `#graphql 
    type Chat {
        id: ID!
        name: String
        participants: [Participant!]!
        messages: [Message!]!
        createdAt: String!
        updatedAt: String!
        unreadMessagesCount: Int
    }

    type Mutation {
        createChat(participants: [ID!]!): Chat!
    }

    type Query {
        getChatMessages(chatId: Int!, page: Int!): Chat!
        getChats: [Chat!]!
        getChat(chatId: Int!): Chat!
    }
`

export default chatTypeDef;