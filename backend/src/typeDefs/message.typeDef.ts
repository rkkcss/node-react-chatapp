const messageTypeDef = `#graphql 
    type Message {
        id: ID!
        sender: User!
        text: String!
        createdAt: String!
        updatedAt: String!
        chat: Chat!
        isRead: Boolean!
        isDelivered: Boolean!
        isFailed: Boolean!
        isReplied: Boolean!
        isEdited: Boolean!
        isDeleted: Boolean!
    }

    type Mutation {
        sendMessage(chatId: ID!, messageText: String!): Message!
        # editMessage(messageId: ID!, newText: String!): Message!
        # replyToMessage(messageId: ID!, replyText: String!): Message!
        # deleteMessage(messageId: ID!): Message!

        # markMessageAsRead(messageId: ID!): Message!
        # markMessageAsDelivered(messageId: ID!): Message!
        # markMessageAsFailed(messageId: ID!): Message!
        # markMessageAsReplied(messageId: ID!): Message!
        # markMessageAsEdited(messageId: ID!): Message!
        # markMessageAsDeleted(messageId: ID!): Message!
    }

    type Query {
        getMessages(chatId: Int!): [Message!]!
        # getMessage(messageId: ID!): Message!
        # getUnreadMessagesCount(chatId: ID!): Int!
    }
`

export default messageTypeDef;