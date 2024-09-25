import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react'

interface PhoneDesignProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}
const PhoneDesign = ({ imgSrc, className, ...props }: PhoneDesignProps) => {
    return (
        <div className={cn('relative pointer-events-none -z-50 overflow-hidden',
            className)} {...props}>
            <Image className='z-50 select-none pointer-events-none' src="/phone-template.png" width={896} height={1831} />
            <div className='absolute -z-10 inset-0'>
                <Image width={896} height={1831} src={imgSrc} 
                className="object-cover min-w-full min-h-full" alt=''/>

            </div>
        </div>
    )
}

export default PhoneDesign