'use client'
import PhoneDesign from '@/components/PhoneDesign'
import { cn, formatPrice } from '@/lib/utils'
import { Configuration } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { TCOLORS } from './Tshirt'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ModalLogin from '@/components/ModalLogin'
import Confetti from 'react-dom-confetti';
import TshirtDesign from '@/components/TshirtDesign'


interface TshirtPreviewProps {
    configuration: Configuration
}

const TshirtPreview = ({ configuration }: TshirtPreviewProps) => {

    const { id } = configuration
    const { size, tshirtColor, basePrice, totalPrice } = configuration
    const color = TCOLORS.find((supportedcolor) => supportedcolor.value === tshirtColor)?.timage

    const { isSignedIn, user } = useUser()
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    useEffect(() => setShowConfetti(true))

    const router = useRouter()
    const config = {
        angle: "59",
        spread: 360,
        startVelocity: 40,
        elementCount: "136",
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "15px",
        height: "10px",
        perspective: "500px",
        colors: ["#f00", "#0f0", "#00f"]
    };

    return (
        <>
            <div className='pointer-events-none select-none absolute inset-0 overflow-hidden
             flex justify-center'>

                <Confetti active={showConfetti} config={config} />
            </div>
            <div className='container mx-auto mt-20 flex flex-col
     items-center md:grid text-sm 
     md:grid-cols-12 gap-8'>
                <div className='md:col-span-4'>
                    <TshirtDesign src={color} imgSrc={configuration.croppedImageUrl}/>
                </div>
                <div className='md:col-span-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 border-b gap-7 py-6 gap-y-4'>
                        <div>
                            <p className='font-semibold text-xl text-zinc-950'>Features</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Supports wireless charging</li>
                                <li>5-year print warranty</li>
                                <li>Durable and water-resistant</li>
                                <li>Available in various finishes</li>
                            </ol>
                        </div>
                        <div>
                            <p className='font-semibold text-xl text-zinc-950'>Materials</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Durable high quality material</li>
                                <li>Resistant to scratches and fingerprints</li>
                            </ol>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='bg-gray-200 p-4 rounded-lg'>
                            <div className='flow-root text-sm'>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-700'>Base Price</p>
                                    <p className='font-semibold text-gray-900'>
                                        {totalPrice}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-700'>Material and Textured Finish</p>
                                    <p className='font-semibold text-gray-900'>
                                        {formatPrice(totalPrice - basePrice)}
                                    </p>
                                </div>
                                <div className='my-2 bg-gray-500 h-px'>

                                </div>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-700'>Order Total</p>
                                    <p className='font-semibold text-gray-900'>
                                        {formatPrice(totalPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='mt-8 flex justify-end space-x-4'>
                        {!isSignedIn && !user ? (
                            <ModalLogin redirectUrl={`/catalog/${id}/tshirt/preview`} />
                        ) :
                            <Button onClick={() => router.push(`/catalog/${id}/tshirt/checkout`)} disabled={!isSignedIn} className=''>
                                Checkout <ArrowRight className='h-4 w-4 ml-2 inline' />
                            </Button>
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default TshirtPreview