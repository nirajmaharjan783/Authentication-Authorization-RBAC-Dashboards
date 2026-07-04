import React from 'react'
import Header from '@/components/layout/Header'
import AuthProvider from '../provider/AuthProvider'
import { getCurrentUser } from '../lib/auth'

const Mainlayout = async ({ children }: { children: React.ReactNode }) => {

    const user = await getCurrentUser()

    return (
        <>
            <main className='container mx-auto px-4 py-8'>
                <AuthProvider>
                    <Header user={user ?? null} />
                    {children}
                </AuthProvider>
            </main>
        </>
    )
}

export default Mainlayout