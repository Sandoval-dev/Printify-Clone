import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const UserMenu = () => {
    return (
        <div className='space-x-4'>
            <Link href="/login">
                <Button variant='outline'>Login</Button>
            </Link>
            <Link href="/">
                <Button variant='success'>Sign up</Button>
            </Link>
        </div>
    )
}

export default UserMenu
