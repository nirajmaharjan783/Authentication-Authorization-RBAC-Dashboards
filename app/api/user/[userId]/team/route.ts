import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await context.params;

        const currentUser = await getCurrentUser();

        if (!currentUser || !checkUserPermission(currentUser, Role.ADMIN)) {
            return NextResponse.json(
                { error: "Only admin can assign team" },
                { status: 401 }
            );
        }

        const { teamId } = await request.json();

        if (teamId) {
            const team = await prisma.team.findUnique({
                where: { id: teamId }
            });

            if (!team) {
                return NextResponse.json(
                    { error: "Team not found" },
                    { status: 404 }
                );
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { teamId: teamId ?? null },
            include: { team: true }
        });

        return NextResponse.json({
            user: updatedUser,
            message: teamId
                ? "User assigned to team successfully"
                : "User removed from team successfully"
        });

    } catch (error) {
        console.error("Team assignment error:", error);

        if (error instanceof Error && error.message.includes("Record to update not found")) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}