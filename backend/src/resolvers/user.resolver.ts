import { prisma, User } from "../prismaClient"

const userResolver = {
    Query: {
        getUserByEmail: async ({ email }: { email: string }) => {
            console.log(email);
            return await User.findUnique({
                where: { email: email },
            })
        },
        getUserById: async ({ id }: { id: number }) => {
            console.log("User id: " + id);
            const user = await prisma.user.findUnique({
                where: { id },
            })
            if (!user) throw new Error("User not found with id: " + id);

            return user;
        }
    }
}

export default userResolver;