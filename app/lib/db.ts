import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient


//Database helper function
export async function checkDatabaseConnection(): Promise<boolean> {
    try {
        await prisma.$queryRaw`Select 1` //simple db ping, used to test db connectivity.
        return true
    } catch (error) {
        console.error("Database connection failed:", error)
        return false
    }
} 