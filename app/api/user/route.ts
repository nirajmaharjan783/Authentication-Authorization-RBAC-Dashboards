import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
    request: NextRequest
): Promise<NextResponse> {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "You are not authorized to access user information" },
                { status: 401 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const teamId = searchParams.get("teamId");
        const role = searchParams.get("role");

        const where: Prisma.UserWhereInput = {};

        if (user.role === Role.ADMIN) {
            // admin sees all
        } else if (user.role === Role.MANAGER) {
            where.OR = [
                { teamId: user.teamId },
                { role: Role.USER }
            ];
        } else {
            where.teamId = user.teamId;
            where.role = { not: Role.ADMIN };
        }

        if (teamId) {
            where.teamId = teamId;
        }

        if (role && Object.values(Role).includes(role as Role)) {
            where.role = role as Role;
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
        });

        return NextResponse.json({ users });

    } catch (error) {
        console.error("Get users error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}