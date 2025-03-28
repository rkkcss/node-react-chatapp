import { mergeTypeDefs } from "@graphql-tools/merge";

import chatTypeDef from "./chat.typeDef";
import messageTypeDef from "./message.typeDef";
import participantType from "./participant.typeDef";
import authDef from "./auth.typeDef";

const mergedTypeDefs = mergeTypeDefs([chatTypeDef, messageTypeDef, participantType, authDef]);

export default mergedTypeDefs;