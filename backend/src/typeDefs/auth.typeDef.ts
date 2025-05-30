const authDef = `#graphql 
    type User {
        id: ID!
        name: String!
        email: String!
        chatRooms: [Participant]
        createdAt: String!
        updatedAt: String!
    }

    type AuthResponse {
        message: String
    }

    type Mutation {
        login(email: String!, password: String!): AuthResponse!
        register(name: String!, email: String!, password: String!): AuthResponse!
        logout: String!
    }

    type Query {
        getUserByEmail(email: String!): User
        getUserById(id: ID!): User
        me: User
    }
`;

export default authDef;
