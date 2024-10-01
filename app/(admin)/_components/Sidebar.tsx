'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


export const navLinks = [
    {
        label: 'Dashboard',
        route: '/p/dashboard',
    },
    {
        label: 'Phone-Order',
        route: '/p/phone-order'
    },
    {
        label: 'Mug-Order',
        route: '/p/mug-order'
    },
    {
        label: 'Tshirt-Order',
        route: '/p/tshirt-order'
    }

]


const Sidebar = () => {

    return (
        <div className='hidden lg:flex h-screen w-72 bg-gray-800 border-r-2'>
            <div className='flex flex-col gap-4 justify-center items-center w-full'>
                <div className='mx-auto ml-14 justify-center items-center mt-12'>
                    <Link href='/'>
                        <Image src='/logo.png' width={160} height={160} alt='logo' />
                    </Link>

                </div>
                <nav className='flex-col w-[90%] h-full justify-between md:flex gap-3'>
                    <ul className='hidden md:flex w-full flex-col items-start gap-4 mt-14'>
                        {
                            navLinks.map((link) => (
                                <Button asChild variant='link' key={link.route} className='w-full h-12 justify-center'>
                                    <Link href={link.route}>
                                        <div className='flex items-center text-white gap-2 w-full text-lg'>
                                            <p>{link.label}</p>
                                        </div>

                                    </Link>
                                </Button>
                            ))
                        }
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Sidebar