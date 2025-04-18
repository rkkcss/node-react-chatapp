import { CustomContext } from "..";
import { comparePassword, generateToken, hashPassword } from "../helpers/auth";
import { prisma } from "../prismaClient";
import { Response } from "express";
import jwt from "jsonwebtoken";

const authResolver = {
    Mutation: {
        login: async (_parent: any, args: { email: string; password: string }, { res }: { res: Response }) => {
            const { email, password } = args;
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(await comparePassword(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = generateToken(user);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60,
            });

            return { message: "Login successful" };
        },

        register: async (_parent: any, args: { name: string; email: string; password: string }) => {
            const { name, email, password } = args;
            console.log("Received data:", { name, email, password });

            if (!name || !email || !password) {
                throw new Error('Missing required fields: name, email, or password');
            }

            const existingUser = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: email,
                        mode: 'insensitive'
                    }
                }
            });
            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

            console.log("User created:", user);
            return { message: `User created with email: ${user.email}` };
        },

        logout: async (_parent: any, _args: any, context: any) => {
            context.res.clearCookie("token", { httpOnly: true, secure: true });

            return { message: "Logout successful" };
        },
    },
    Query: {
        me: (_: any, __: any, context: CustomContext) => {
            const token = context.req?.cookies?.token;

            if (!token) {
                console.warn("Nincs token a cookie-kban.");
                return null;
            }

            try {
                const decoded = jwt.verify(token, "your-secret-key") as { id: number; email: string; name: string };
                return decoded;
            } catch (err) {
                console.error("Érvénytelen token:", err);
                return null;
            }
        },
    }

};

export default authResolver;