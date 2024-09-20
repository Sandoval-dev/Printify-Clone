import React from 'react'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { routes } from '@/constants'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Header = () => {
    return (
        <div className='h-16 shadow-md bg-white w-full fixed z-50'>
            <div className='container mx-auto flex flex-row items-center justify-between p-3'>
                <div className='lg:hidden flex items-center'>
                    <MenuIcon />
                </div>
                <div className='flex items-center mr-auto'>
                    <Link href="/">
                        <Image alt='logo' src='/logo.png'
                            width={512} height={128} className='h-10 w-auto' />
                    </Link>

                </div>
                <nav className='hidden lg:flex mr-auto ml-16 space-x-8'>
                    {
                        routes.map((route) => (
                            <Link href={route.href} key={route.id}>{route.title}</Link>
                        ))

                    }
                </nav>
                <div className='space-x-4'>
                    <Link href="/login">
                        <Button variant='outline'>Login</Button>
                    </Link>
                    <Link href="/">
                        <Button variant='success'>Sign up</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Header
