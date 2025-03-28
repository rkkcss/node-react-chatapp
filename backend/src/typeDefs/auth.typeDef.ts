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

    type Mutation {
        login(email: String!, password: String!): String!
        register(name: String!, email: String!, password: String!): String!
    }

    type Query {
        getUserByEmail(email: String!): User
        getUserById(id: ID!): User
    }
`;

export default authDef;
