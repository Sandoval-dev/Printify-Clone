import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className='flex gap-2 max-h-screen relative'>
            <div className='absolute top-2 left-2'>
                <Link href='/'>
                    <X className='text-slate-700' />
                </Link>

            </div>
            <div className='w-full md:w-1/2 flex flex-col space-y-8 items-center justify-center h-screen'>
                <Link href="/">
                    <Image alt='logo' src='/logo.png'
                        width={512} height={128} className='h-10 w-auto' />
                </Link>
                <div className='text-center'>
                    <h2 className='font-semibold text-3xl'> Welcome Back</h2>
                </div>
                {children}
            </div>
            <div className='hidden md:flex w-1/2 h-screen'>
                <Image className='object-cover w-full h-full' alt='auth' src="/image1.png" width={1080} height={1920} />

            </div>
        </div>
    )
}

export default AuthLayout