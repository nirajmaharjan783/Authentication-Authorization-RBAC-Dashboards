import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, context: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await context.params
        const currentUser = await getCurrentUser()
        console.log("Current User:", currentUser)

        if (!currentUser || !checkUserPermission(currentUser, Role.ADMIN)) {
            return NextResponse.json({
                error: "You cannot asiign a team only Admin can"
            }, { status: 401 })
        }

        if (userId === currentUser.id) {
            return NextResponse.json({
                error: "you cannot change your own role"
            }, { status: 401 })
        }

        const { role } = await request.json()

        const validateRole = [Role.USER, Role.MANAGER]
        if (!validateRole.includes(role)) {
            return NextResponse.json({
                error: "Invalid role selection and you cannot have more than one Admin role user"
            }, { status: 404 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role
            },
            include: {
                team: true
            }
        })

        return NextResponse.json({
            user: updatedUser,
            message: `User role updated to ${role} successfully`
        })

    } catch (error) {
        console.error("Role assignment error:", error)
        if (error instanceof Error && error.message.includes("Record to update not found")) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            error: "Internal server error, Something went wrong!"
        }, { status: 500 })
    }
}