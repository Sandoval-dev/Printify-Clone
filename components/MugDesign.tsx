import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react'

interface MugDesignProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}
const MugDesign = ({ imgSrc, className,src, ...props }: MugDesignProps) => {
    return (
        <div className={cn('relative pointer-events-none -z-50 overflow-hidden',
            className)} {...props}>
            <Image className='z-50 select-none pointer-events-none' src={src} width={896} height={1831} />
            <div className='absolute z-10 inset-0 flex items-center justify-center'>
                <Image width={177} height={385} src={imgSrc} 
                className="object-cover" alt=''/>

            </div>
        </div>
    )
}

export default MugDesign