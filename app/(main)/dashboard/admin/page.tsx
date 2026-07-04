import { checkUserPermission, getCurrentUser } from "@/app/lib/auth"
import { prisma } from "@/app/lib/db"
import { transformTeams, transformUsers } from "@/app/lib/util"
import { Role } from "@prisma/client"
import AdminDashboard from "@/components/layout/dashboard/AdminDashboard"
import { redirect } from "next/navigation"

const AdminPage = async () => {

    const user = await getCurrentUser()
    if (!user || !checkUserPermission(user, Role.ADMIN)) {
        redirect("/unauthorized")
    }

    //Fetch data for admin dashboard
    const [prismaUsers, prismaTeams] = await Promise.all([
        prisma.user.findMany({
            include: {
                team: true
            },
            orderBy: { createdAt: "desc" },
        }),

        prisma.team.findMany({
            include: {
                member: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true
                    }
                }
            }
        })
    ]);

    const users = transformUsers(prismaUsers)
    const teams = transformTeams(prismaTeams)
    return <AdminDashboard users={users} teams={teams} currentUser={user} />
}

export default AdminPage 