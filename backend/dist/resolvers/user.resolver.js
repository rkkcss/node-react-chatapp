"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../prismaClient");
const userResolver = {
    Query: {
        getUserByEmail: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { email }) {
            console.log(email);
            return yield prismaClient_1.User.findUnique({
                where: { email: email },
            });
        }),
        getUserById: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const id = Number(args.id);
            console.log("Provided id: " + id);
            if (typeof id !== "number" || isNaN(id)) {
                throw new Error("Invalid ID format: ID must be a number");
            }
            const user = yield prismaClient_1.prisma.user.findUnique({
                where: { id },
            });
            if (!user)
                throw new Error("User not found with id: " + id);
            return user;
        })
    }
};
exports.default = userResolver;
