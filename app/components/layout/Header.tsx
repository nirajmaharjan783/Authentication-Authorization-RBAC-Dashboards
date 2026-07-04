"use client"

import { User } from "@prisma/client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface HeaderProps {
    user: User | null
}

const Header = ({ user }: HeaderProps) => {
    const pathname = usePathname()
    const navigation = [
        { name: "Home", href: "/", show: true },
        { name: "Dashboard", href: "/dashboard", show: true }
    ].filter((item) => item.show)

    const getNavItemClass = (href: string) => {
        let isActive = false
        if (href === "/") {
            isActive = pathname === "/"
        } else if (href === "/dashboard") {
            isActive = pathname.startsWith(href)
        }
        return `px-3 py-2 rounded text-sm font-medium transition-colors ${isActive
            ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
    }

    return (
        <header className="bg-slate-900 border-b  border-slate-700">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="font-bold text-xl text-white">
                        Team Access
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className={getNavItemClass(item.href)}>
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Info */}

                </div>
            </div>
        </header>
    )
}

export default Header