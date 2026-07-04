import Link from 'next/link'

const Home = async () => {
    const user = false

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center">
            <div className="max-w-6xl mx-auto w-full px-6">

                {/* HERO */}
                <div className="text-center mb-14">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Secure Team Access Control
                    </h1>

                    <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
                        A production-ready RBAC system to manage users, roles, and teams with secure authentication and scalable architecture.
                    </p>

                    <div className="mt-6 flex justify-center gap-4">
                        <Link
                            href="/register"
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                        >
                            Get Started
                        </Link>

                        <Link
                            href="/login"
                            className="px-6 py-3 border border-slate-600 hover:bg-slate-800 rounded-lg font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* LEFT */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8 shadow-xl">
                        <h2 className="text-xl font-semibold mb-6">
                            What this system solves
                        </h2>

                        <div className="space-y-4 text-slate-300 text-sm">
                            <p className="p-4 bg-slate-800 rounded-lg">
                                🔐 Secure authentication & authorization flow
                            </p>
                            <p className="p-4 bg-slate-800 rounded-lg">
                                👥 Centralized team & user management
                            </p>
                            <p className="p-4 bg-slate-800 rounded-lg">
                                🛡️ Role-based access control (RBAC)
                            </p>
                            <p className="p-4 bg-slate-800 rounded-lg">
                                ⚡ Middleware route protection
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-8 shadow-xl">
                        <h2 className="text-xl font-semibold mb-6">
                            Access Levels
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="p-4 bg-slate-800 rounded-lg">
                                <span className="text-purple-400 font-semibold">Super Admin</span>
                                <p className="text-slate-400">Full system control & configuration</p>
                            </div>

                            <div className="p-4 bg-slate-800 rounded-lg">
                                <span className="text-green-400 font-semibold">Admin</span>
                                <p className="text-slate-400">Manage users, teams, and permissions</p>
                            </div>

                            <div className="p-4 bg-slate-800 rounded-lg">
                                <span className="text-yellow-400 font-semibold">Manager</span>
                                <p className="text-slate-400">Manage assigned team resources</p>
                            </div>

                            <div className="p-4 bg-slate-800 rounded-lg">
                                <span className="text-blue-400 font-semibold">User</span>
                                <p className="text-slate-400">Access personal dashboard only</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATUS */}
                <div className="mt-12">
                    {user ? (
                        <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
                            <p className="text-green-300">
                                Welcome back, <strong>Niraj</strong> — you are logged in.
                            </p>

                            <Link
                                href="/dashboard"
                                className="inline-block mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
                            <p className="text-blue-300 mb-4">
                                You are not authenticated. Please login or create an account to continue.
                            </p>

                            <div className="flex gap-3">
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};


export default Home