import prisma from '#context/dbContext/prisma/client.ts';
import {UserType} from "#domain/enums/userType.ts";
import {UserFactory} from "#domain/factories/UserFactory.js";

const createAdminUser = async (): Promise<void> => {
    try {
        const email = process.argv[2];
        const password = process.argv[3];

        if (!email || !password) {
            console.log("Please specify a valid email");
            console.log("Usage: node adminUser.ts <email> <password>");
            process.exit(1);
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (existingUser) {
            console.log(`⚠️  User with email "${email}" already exists!`);
            console.log('💡 Run "node listUsers.js" to see all available users.\n');
            process.exit(1);
        }

        const userEntity = UserFactory.create(email, password, UserType.admin);

        const adminUser = await prisma.user.create(userEntity);

        console.log("✅ SUCCESS! Admin user created! 👑\n");
        console.log("Admin Credentials:");
        console.log("─".repeat(50));
        console.log(`  Email:    ${email}`);
        console.log(`  Password: ${password}`);
        console.log(`  Role:     ${adminUser.role}`);
        console.log(`  User ID:  ${adminUser.id}`);
        console.log("─".repeat(50));
        console.log("\n🎉 You can now login with these credentials!\n");
        console.log("⚠️  IMPORTANT: Please save these credentials securely!\n");

        process.exit(0);
    } catch (error: any) {
        console.error("❌ Error creating admin user:", error.message);
    }
};

await createAdminUser();