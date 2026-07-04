import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Prisma, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser() //accessible for only logged in user
        if (!user) {
            return NextResponse.json({
                error: "You are not authorized to access user information"
            }, { status: 401 })
        }

        const searchParams = request.nextUrl.searchParams
        const teamId = searchParams.get("teamId")
        const role = searchParams.get("role")

        //Build where clause based on user role
        const where: Prisma.UserWhereInput = {}
        if (user.role === Role.ADMIN) {
            //Admin can see all users
        } else if (user.role === Role.MANAGER) {
            //manager can see users in their team or cross team users but not cross team managers
            where.OR = [{ teamId: user.teamId }, { role: Role.USER }]
        } else {
            //Regular users can only see in their team
            where.teamId = user.teamId
            where.role = { not: Role.ADMIN }
        }

        //Additional filter
        if (teamId) {
            where.teamId = teamId
        }

        if (role) {
            where.role = role as Role
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                team: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ users })

    } catch (error) {
        console.error("Get users error:", error)

        return NextResponse.json({
            error: "Invalid server error, Something went wrong",
        }, { status: 500 })
    }
}