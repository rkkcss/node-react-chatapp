"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const chat_typeDef_1 = __importDefault(require("./chat.typeDef"));
const message_typeDef_1 = __importDefault(require("./message.typeDef"));
const participant_typeDef_1 = __importDefault(require("./participant.typeDef"));
const auth_typeDef_1 = __importDefault(require("./auth.typeDef"));
const mergedTypeDefs = (0, merge_1.mergeTypeDefs)([chat_typeDef_1.default, message_typeDef_1.default, participant_typeDef_1.default, auth_typeDef_1.default]);
exports.default = mergedTypeDefs;
