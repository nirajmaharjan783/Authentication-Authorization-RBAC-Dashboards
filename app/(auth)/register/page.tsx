"use client";

import { apiClient } from "@/app/lib/apiClient";
import { useActionState } from "react";

export type RegisterState = {
    error?: string;
    success?: boolean;
};

const RegisterPage = () => {
    const [state, registerAction, isPending] = useActionState(
        async (
            prevState: RegisterState,
            formData: FormData
        ): Promise<RegisterState> => {
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const teamCode = formData.get("teamCode") as string;

            try {
                await apiClient.register({ name, email, password, teamCode: teamCode || undefined, });
                window.location.href = "/dashboard";
                return { success: true };
            } catch (error) {
                return {
                    error:
                        error instanceof Error ? error.message : "Registration failed",
                };
            }
        },
        { error: undefined, success: undefined }
    );

    return (
        <div className="min-h-screen flex bg-[#F5F7FB]">

            {/* LEFT PANEL */}
            <div className="hidden md:flex w-1/2 flex-col justify-center px-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

                <div className="max-w-md">

                    <h1 className="text-4xl font-semibold leading-tight tracking-tight">
                        Secure Team Access for Modern SaaS Products
                    </h1>

                    <p className="mt-5 text-slate-300 text-base leading-relaxed">
                        Build scalable role-based access control systems with enterprise-grade security and modern architecture.
                    </p>

                    <div className="mt-10 space-y-3 text-slate-300 text-sm">
                        <p>✓ Role-based permissions</p>
                        <p>✓ Team & workspace management</p>
                        <p>✓ Secure authentication system</p>
                        <p>✓ Production-ready API structure</p>
                    </div>

                    <div className="mt-12 text-xs text-slate-500">
                        Trusted by modern engineering teams worldwide
                    </div>

                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">

                <div className="w-full max-w-md">

                    {/* CARD */}
                    <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-10">

                        {/* HEADER */}
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Create new account
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                <span>Create your workspace in seconds</span>{" "}

                                <span className="text-blue-600 font-medium">or</span>{" "}

                                <a
                                    href="/login"
                                    className="text-blue-600 font-medium hover:text-blue-700"
                                >
                                    Sign in to existing account
                                </a>
                            </p>
                        </div>

                        {/* ERROR */}
                        {state?.error && (
                            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {state.error}
                            </div>
                        )}

                        {/* FORM */}
                        <form action={registerAction} className="space-y-5">

                            <div>
                                <label className="text-sm text-slate-600">Full name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    className="mt-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">Work email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="john@company.com"
                                    required
                                    className="mt-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="mt-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-slate-600">
                                    Team invite code <span className="text-slate-400">(optional)</span>
                                </label>
                                <input
                                    name="teamCode"
                                    type="text"
                                    placeholder="INVITE-XXXX"
                                    className="mt-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition shadow-sm"
                            >
                                {isPending ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        {/* FOOTER */}
                        <p className="text-xs text-slate-400 text-center mt-6">
                            By continuing you agree to our Terms & Privacy Policy
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;