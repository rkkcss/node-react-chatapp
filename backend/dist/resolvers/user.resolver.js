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
    getUserByEmail: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
        console.log(email);
        return yield prismaClient_1.User.findUnique({
            where: { email: email },
        });
    }),
    getUserById: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        console.log("User id: " + id);
        const user = yield prismaClient_1.prisma.user.findUnique({
            where: { id },
            include: {
                blogs: true,
            }
        });
        if (!user)
            throw new Error("User not found with id: " + id);
        return user;
    })
};
exports.default = userResolver;
