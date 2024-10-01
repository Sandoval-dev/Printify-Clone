'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuSquare } from 'lucide-react'
import { navLinks } from './Sidebar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const MobileMenu = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <div className='lg:hidden block'>
                        <MenuSquare />
                    </div>
                </SheetTrigger>
                <SheetContent className='bg-slate-800 text-white'>
                    <div className='w-full flex-col items-start gap-4 mt-14'>
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
                    </div>

                </SheetContent>
            </Sheet>

        </div>
    )
}

export default MobileMenu