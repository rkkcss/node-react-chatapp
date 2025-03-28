import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // Cseréld ki egy erősebb, biztonságos kulcsra!

// Jelszó hashelése
export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

// Jelszó ellenőrzése
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

// JWT token generálása
export const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// JWT token ellenőrzése
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
