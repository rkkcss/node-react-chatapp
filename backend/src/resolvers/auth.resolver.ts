import { comparePassword, generateToken, hashPassword } from "../helpers/auth";
import { prisma } from "../prismaClient";


const authResolver = {
    Mutation: {
        login: async ({ email, password }: { email: string; password: string }) => {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !(await comparePassword(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            return generateToken(user.id);
        },

        register: async ({ name, email, password }: { name: string; email: string; password: string }) => {
            console.log(name, email, password);
            if (!name || !email || !password) {
                throw new Error('Missing required fields: name, email, or password');
            }

            console.log(name, email, password);

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hashedPassword = await hashPassword(password);
            const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
            return `User created with email: ${user.email}`;
        }

    }
};

export default authResolver;