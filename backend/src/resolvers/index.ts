import { mergeResolvers } from "@graphql-tools/merge";
import chatResolver from "./chat.resolver";
import userResolver from "./user.resolver";
import authResolver from "./auth.resolver";
import messageResolver from "./message.resolver";


const mergedResolvers = mergeResolvers([chatResolver, userResolver, messageResolver, authResolver]);

export default mergedResolvers;