import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const UserMenu = async () => {
    const user = await currentUser()

    return (
        <div>
            {
                user && (
                    <>
                        <div className='flex flex-row items-center justify-center gap-3'>
                            <Link href="/myorder">
                                <Button variant="outline">Order</Button>
                            </Link>
                            <UserButton />
                        </div>

                    </>
                )
            }
            {!user && (
                <div className='space-x-4'>
                    <Link href="/sign-in">
                        <Button variant='outline'>Login</Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button variant='outline'>Sign up</Button>
                    </Link>
                </div>
            )
            }

        </div>
    )
}

export default UserMenu
