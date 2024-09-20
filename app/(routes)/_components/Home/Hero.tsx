import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className='container mx-auto px-4 py-16'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
                <div className='lg:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl lg:text-5xl font-semibold'>Create and sell custom products</h2>
                    <div className='mt-6 flex flex-col gap-4'>
                        <p className='flex items-center gap-2 text-lg'>
                           <Check className='text-mycolor-100 text-lg'/> 100 % Free to use
                        </p>
                        <p className='flex items-center gap-2 text-lg'>
                           <Check className='text-mycolor-100 text-lg'/> 900+ High-Quality Products
                        </p>
                        <p className='flex items-center gap-2 text-lg'>
                           <Check className='text-mycolor-100 text-lg'/> Largest global print network
                        </p>
                    </div>
                    <div className='mt-8 flex flex-col gap-4 lg:flex-row lg:gap-6'>
                        <Button size='lg' variant='success'>Start Free</Button>
                        <Button size='lg' variant='outline'>How it works?</Button>
                    </div>
                    <div className='mt-4'>
                       <p className='text-sm text-mycolor-100 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus.</p>
                    </div>
                </div>
                <div className='lg:w-1/2 flex justify-center items-center'>
                  <Image className='max-w-full h-auto' alt='hero' src="/hero.gif" 
                  width={512} height={512}/>
                </div>

            </div>
        </div>
    )
}

export default Hero
