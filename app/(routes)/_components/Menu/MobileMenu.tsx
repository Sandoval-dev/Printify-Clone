import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { routes } from '@/constants'
import Link from 'next/link'


const MobileMenu = () => {
    return (
        <div className='lg:hidden flex items-center'>
            <Sheet>
                <SheetTrigger><MenuIcon /></SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle>Welcome Printify Clone</SheetTitle>
                    </SheetHeader>
                    <div className='flex flex-col mt-8 space-y-6'>
                        {
                            routes.map((route) => (
                                <Link href={route.href} key={route.id}>{route.title}</Link>
                            ))

                        }
                    </div>

                </SheetContent>
            </Sheet>

        </div>
    )
}

export default MobileMenu
