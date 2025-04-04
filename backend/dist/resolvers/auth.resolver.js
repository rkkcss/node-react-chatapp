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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../helpers/auth");
const prismaClient_1 = require("../prismaClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authResolver = {
    Mutation: {
        login: (_parent_1, args_1, _a) => __awaiter(void 0, [_parent_1, args_1, _a], void 0, function* (_parent, args, { res }) {
            const { email, password } = args;
            const user = yield prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!user || !(yield (0, auth_1.comparePassword)(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = (0, auth_1.generateToken)(user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
            });
            return { message: "Login successful" };
        }),
        register: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, email, password } = args;
            console.log("Received data:", { name, email, password });
            if (!name || !email || !password) {
                throw new Error('Missing required fields: name, email, or password');
            }
            const existingUser = yield prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }
            const hashedPassword = yield (0, auth_1.hashPassword)(password);
            const user = yield prismaClient_1.prisma.user.create({ data: { name, email, password: hashedPassword } });
            console.log("User created:", user);
            return `User created with email: ${user.email}`;
        }),
        logout: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            context.res.clearCookie("token", { httpOnly: true, secure: true });
            return "Logout successful";
        }),
    },
    Query: {
        me: (_, __, context) => {
            var _a, _b;
            const token = (_b = (_a = context.req) === null || _a === void 0 ? void 0 : _a.cookies) === null || _b === void 0 ? void 0 : _b.token;
            if (!token) {
                console.warn("Nincs token a cookie-kban.");
                return null; // ❌ { user: null } helyett simán null kell
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, "your-secret-key");
                return decoded; // ✅ Nem kell { user: decoded }, mert a schema `User`-t vár vissza
            }
            catch (err) {
                console.error("Érvénytelen token:", err);
                return null;
            }
        },
    }
};
exports.default = authResolver;
