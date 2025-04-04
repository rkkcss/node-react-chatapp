const participantType = `#graphql 
    type Participant {
    id: ID!
    userId: Int!
    chatId: Int!
    user: User!
    chat: Chat!
}
`

export default participantType;