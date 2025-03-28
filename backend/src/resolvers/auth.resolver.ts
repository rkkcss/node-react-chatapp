import { comparePassword, generateToken, hashPassword } from "../helpers/auth";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

const authResolver = {
    Mutation: {
        login: async (_parent: any, args: { email: string; password: string }, { res }: { res: Response }) => {
            const { email, password } = args;
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user || !(await comparePassword(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = generateToken(user.id);

            // 🔹 HTTPOnly sütiben tároljuk a tokent!
            res.cookie("token", token, {
                httpOnly: true, // 🔹 Nem érhető el JavaScriptből
                secure: process.env.NODE_ENV === "production", // 🔹 Csak HTTPS-en, ha éles környezet
                sameSite: "strict", // 🔹 CSRF támadások ellen
                maxAge: 1000 * 60 * 60, // 🔹 1 óra
            });

            return { message: "Login successful" };
        },

        register: async (_parent: any, args: { name: string; email: string; password: string }) => {
            const { name, email, password } = args;
            console.log("Received data:", { name, email, password });

            if (!name || !email || !password) {
                throw new Error('Missing required fields: name, email, or password');
            }

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

            console.log("User created:", user);
            return `User created with email: ${user.email}`;
        },

        logout: async (_parent: any, _args: any, context: any) => {
            context.res.clearCookie("token", { httpOnly: true, secure: true });

            return "Logout successful";
        },
    }

};

export default authResolver;