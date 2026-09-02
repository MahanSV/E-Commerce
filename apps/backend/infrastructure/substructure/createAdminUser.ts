import prisma from '#context/dbContext/prisma/client.ts';
import {UserType} from "#domain/enums/userType.ts";

const createAdminUser = async (): Promise<void> => {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.log("Please specify a valid email");
        console.log("Usage: node adminUser.js <email> <password>");
        process.exit(1);
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
        }
    });

    if (!existingUser) {
        console.log(`❌ User with email "${email}" not found.`);
        console.log('💡 Run "node listUsers.js" to see all available users.\n');
        process.exit(1);
    }

    // Check if already admin
    if (existingUser.role === "admin") {
        console.log(`ℹ️  User "${email}" is already an admin! 👑\n`);
        process.exit(0);
    }

    // Update user role to admin
    await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: UserType.admin },
    });
};

await createAdminUser();