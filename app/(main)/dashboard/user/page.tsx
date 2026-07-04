import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { transformUser, transformUsers } from "@/app/lib/util";
import { Role, User } from "@/app/types";
import UserDashboard from "@/components/layout/dashboard/UserDashboard";
import { redirect } from "next/navigation";

const UserPage = async () => {
    const user = await getCurrentUser();

    if (!user || !checkUserPermission(user, Role.USER)) {
        redirect("/login");
    }

    // Fetch all users
    const prismaUsers = await prisma.user.findMany({
        where: {
            teamId: user.teamId,
            role: Role.USER
        },
        include: {
            team: true,
        },
    });

    // Transform Prisma data into your custom types
    const currentUser = transformUser(user);
    const users = transformUsers(prismaUsers);

    return (
        <UserDashboard
            teamMembers={users as User[]}
            currentUser={currentUser}
        />
    );
};

export default UserPage;