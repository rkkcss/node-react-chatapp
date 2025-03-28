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
const auth_1 = require("../helpers/auth");
const prismaClient_1 = require("../prismaClient");
const authResolver = {
    login: (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
        const user = yield prismaClient_1.prisma.user.findUnique({ where: { email } });
        if (!user || !(yield (0, auth_1.comparePassword)(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return (0, auth_1.generateToken)(user.id);
    }),
    register: (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password }) {
        const existingUser = yield prismaClient_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const hashedPassword = yield (0, auth_1.hashPassword)(password);
        const user = yield prismaClient_1.prisma.user.create({ data: { name, email, password: hashedPassword } });
        return `User created with email: ${user.email}`;
    }),
};
exports.default = authResolver;
