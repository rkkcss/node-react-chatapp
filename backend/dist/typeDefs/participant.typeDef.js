"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const participantType = `#graphql 
    type Participant {
    id: ID!
    userId: Int!
    chatId: Int!
    user: User!
    chat: Chat!
}
`;
exports.default = participantType;
