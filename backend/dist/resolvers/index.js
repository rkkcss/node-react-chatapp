"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const chat_resolver_1 = __importDefault(require("./chat.resolver"));
const user_resolver_1 = __importDefault(require("./user.resolver"));
const auth_resolver_1 = __importDefault(require("./auth.resolver"));
const message_resolver_1 = __importDefault(require("./message.resolver"));
const mergedResolvers = (0, merge_1.mergeResolvers)([chat_resolver_1.default, user_resolver_1.default, auth_resolver_1.default, message_resolver_1.default]);
exports.default = mergedResolvers;
