import { gql } from "@apollo/client";

export const GET_CHAT_MESSAGES = gql`
    query getChatMessages($chatId: Int!, $page: Int!) {
        getChatMessages(chatId: $chatId, page: $page) {
            name
            id
            participants {
                id
                user {
                    name
                }
            }
            messages {
                id
                text
                sender {
                    id
                }
                createdAt
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($content: String!, $chatId: Int!) {
        sendMessage(content: $content, chatId: $chatId) {
            id
            createdAt
            text
            sender {
                id
            }
        }
    }
`