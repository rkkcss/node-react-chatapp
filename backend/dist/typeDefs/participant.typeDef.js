"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const participantType = `#graphql 
    type Participant{
        id: ID!
        user: User!
        chat: Chat!
    }
`;
exports.default = participantType;
