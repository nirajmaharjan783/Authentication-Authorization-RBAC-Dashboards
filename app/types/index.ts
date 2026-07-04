// export enum Role {
//     ADMIN = "ADMIN",
//     MANAGER = "MANAGER",
//     USER = "USER",
//     GUEST = "GUEST",
// }

import { Role } from "@prisma/client";
export { Role };

export interface User {
    id: string
    name: string
    email: string
    role: Role
    teamId?: string | null
    team?: Team
    createdAt: Date
    updatedAt: Date
}

export interface Team {
    id: string,
    name: string,
    description?: string | null
    code: string
    members: User[]
    createdAt: Date
    updatedAt: Date
}


export interface AuthContextType {
    user: User | null,
    login: (formData: FormData) => void;
    logout: () => void;
    hasPermission: (RequiredRole: Role) => boolean
}