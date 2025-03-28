import { prisma, User } from "../prismaClient"

const userResolver = {
    Query: {
        getUserByEmail: async (_parent: any, { email }: { email: string }) => {
            console.log(email);
            return await User.findUnique({
                where: { email: email },
            })
        },
        getUserById: async (_parent: any, args: { id: number }) => {
            const id = Number(args.id);
            console.log("Provided id: " + id);

            if (typeof id !== "number" || isNaN(id)) {
                throw new Error("Invalid ID format: ID must be a number");
            }

            const user = await prisma.user.findUnique({
                where: { id },
            })

            if (!user) throw new Error("User not found with id: " + id);

            return user;
        }
    }
}

export default userResolver;