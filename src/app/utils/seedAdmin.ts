
import bcrypt from "bcryptjs"
import { prisma } from "../../config/db";
import { Role } from "@prisma/client";


export const seedAdmin = async () => {
    try {
        const isAdminExists = await prisma.user.findUnique({
            where: {
                email: process.env.ADMIN_EMAIL as string
            }
        })

        if (isAdminExists) {
            console.log(" admin already exists")
            return
        }


        const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, Number(process.env.BCRYPT_SALT_ROUND))

        const Admin = prisma.user.create({
            data: {
                name: "admin",
                email: process.env.ADMIN_EMAIL as string,
                password: hashPassword,
                role: Role.ADMIN,
            }
        })
        console.log("Admin created:");
        return Admin
    } catch (error) {
        console.log("error seeding Admin", error)
    }

}