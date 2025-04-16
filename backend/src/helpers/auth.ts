import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomContext } from '..';
import { Socket } from 'socket.io';

const JWT_SECRET = 'your-secret-key'; // Cseréld ki egy erősebb, biztonságos kulcsra!

// Jelszó hashelése
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

// Jelszó ellenőrzése
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

// JWT token generálása
export const generateToken = (user: any): string => {
    return jwt.sign({ name: user.name, email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

// JWT token ellenőrzése
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as User;
    } catch (error) {
        return null;
    }
};

const parseTokenFromCookie = (cookieHeader: string): string | null => {
    const match = cookieHeader.match(/token=([^;]+)/);
    return match ? match[1] : null;
};

export const getUserFromContext = (context: CustomContext | Socket) => {
    let token: string | null = null;

    if ("req" in context && context.req?.cookies?.token) {
        // GraphQL context (Express Request alapú)
        token = context.req.cookies.token;
    } else if ("handshake" in context && context.handshake.headers?.cookie) {
        // Socket.IO context
        token = parseTokenFromCookie(context.handshake.headers.cookie);
        console.log("TOKEN", token)
    }

    if (!token) {
        throw new Error("User is not authenticated!");
    }

    return verifyToken(token);
};
