import { Button } from '@/components/ui/button'
import { routes } from '@/constants'
import { Facebook, InstagramIcon, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='border-t-2 border-t-mycolor-200'>
            <div className='container mx-auto py-16'>
                <div className='text-center space-y-8'>
                    <h2 className='text-2xl font-semibold'>Have Questions About Print?</h2>
                    <p className='font-light'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, aspernatur?
                    </p>
                    <Button variant='success'>Help center</Button>
                </div>
            </div>
            <div className='mt-8 bg-mycolor-200 p-8'>
                <div className='container flex flex-row mx-auto'>
                    <Link href="/">
                        <Image className='h-10 w-auto' alt='logo' src='/logo.png'
                            width={512} height={120} />
                    </Link>
                    <div className='flex flex-row gap-4 ml-auto'>
                        <Button size='icon' variant='success'><Facebook /></Button>
                        <Button size='icon' variant='success'><InstagramIcon /></Button>
                        <Button size='icon' variant='success'><Linkedin /></Button>
                        <Button size='icon' variant='success'><Twitter /></Button>
                    </div>
                </div>

            </div>

            <div className='text-center mt-8 mb-8 space-x-8'>
                {
                    routes.map((route) => (
                        <Link href={route.href} key={route.id}>{route.title}</Link>
                    ))

                }
            </div>
        </div>
    )
}

export default Footer