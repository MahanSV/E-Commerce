import prisma from '#context/dbContext/prisma/client.ts';
import {UserType} from "#domain/enums/userType.ts";
import User from "#models/User.ts";

async function listUsers(): Promise<void> {
    try {
        console.log("🔍 Fetching all users from database...\n");

        const adminsAndCustomers = await prisma.user.findMany({
            where: {
                OR: [
                    { role: UserType.admin },
                    { role: UserType.user }
                ]
            },
            select: {
                name: true,
                lastName: true,
                email: true,
                role: true,
            }
        });

        const admins = adminsAndCustomers.filter((user: Partial<User>) => user.role === UserType.admin);
        const customers = adminsAndCustomers.filter((user: Partial<User>) => user.role === UserType.user);

        // Admin Logs
        console.log("\n🛡️ Admins list:");
        console.table(admins);
        console.log("Admins amount: ", admins.length);

        // Customers Logs
        console.log("\n👥 Customers list:");
        console.table(customers);
        console.log("Customers amount: ", customers.length);

        process.exit(0);
    } catch (error: any) {
        console.error("❌ Error fetching users:", error.message);
    }
}

await listUsers();