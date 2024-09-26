'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import HandleComponent from '../HandleComponent'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TCOLORS, TSHIRT_BASE_PRICE, TSIZES } from './Tshirt'
import { Radio, RadioGroup } from '@headlessui/react'
import { Label } from '@/components/ui/label'
import { cn, formatPrice } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { saveConfig as _saveConfig, SaveConfigArgs } from './TshirtAction'
import { useUploadThing } from '@/lib/uploadthing'
import { useMutation } from '@tanstack/react-query'


interface TshirtDesignConfig {
    configId: string,
    imageUrl: string,
    imageDimensions: {
        width: number,
        height: number
    }
    productType: string

}


const TshirtDesignConfig = ({ configId, imageDimensions, imageUrl, productType }: TshirtDesignConfig) => {

    const { startUpload } = useUploadThing('imageUploader')
    const { toast } = useToast()
    const router = useRouter()

    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimensions.width / 4,
        height: imageDimensions.height / 4,
    })


    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 205
    })

    const tshirtRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [options, setOptions] = useState<{

        color: (typeof TCOLORS)[number]
        size: (typeof TSIZES)[number]
    }>({
        color: TCOLORS[0],
        size: TSIZES[0]
    })

    async function saveConfiguration() {

        const {
            left: caseLeft,
            top: caseTop,
            width,
            height,
        } = tshirtRef.current!.getBoundingClientRect()

        const { left: containerLeft, top: containerTop } =
            containerRef.current!.getBoundingClientRect()

        const leftOffset = caseLeft - containerLeft
        const topOffset = caseTop - containerTop

        const actualX = renderedPosition.x - leftOffset
        const actualY = renderedPosition.y - topOffset

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        const userImage = new window.Image()
        userImage.crossOrigin = 'anonymous'
        userImage.src = imageUrl
        await new Promise((resolve) => (userImage.onload = resolve))

        ctx?.drawImage(
            userImage,
            actualX,
            actualY,
            renderedDimension.width,
            renderedDimension.height
        )

        //Yeni kırpılmış bölge
        const cropX=175;
        const cropY=355
        const cropWidth=width-cropX-175;
        const cropHeight=height-cropY-355

        //Kırpma işlemi için yeni canvas oluştur
        const croppedCanvas = document.createElement('canvas')
        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight
        const croppedCtx = croppedCanvas.getContext('2d')

        //Orijinal canvastan kırpılan bölgeyi yeni canvasa çiz
        croppedCtx?.drawImage(
            canvas,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            cropWidth,
            cropHeight
        )

        const base64 = canvas.toDataURL()
        const base64Data = base64.split(',')[1]

        const blob = base64ToBlob(base64Data, 'image/png')
        const file = new File([blob], 'filename.png', { type: 'image/png' })
        await startUpload([file], { configId })

    }

    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        return new Blob([byteArray], { type: mimeType })
    }

    const { mutate: saveConfig, isPending } = useMutation({

        mutationKey: ['save-config'],
        mutationFn: async (args: SaveConfigArgs) => {
            try {
                await Promise.all([saveConfiguration(), _saveConfig(args)])

            } catch (error) {
                console.error('Mutation error', error)
                throw error;
            }
        },
        onError: (error) => {
            console.error('Mutation error', error)
            toast({
                title: 'Error',
                description: 'Failed to save configuration',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            console.log('Mutation success')
            router.push(`/catalog/${configId}/tshirt/preview`)
        }

    })

    return (
        <div className='container mx-auto'>
            <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
                <div className='col-span-2 relative h-[600px] overflow-hidden w-full
                  max-w-4xl flex items-center justify-center
                   rounded-lg border-2 border-dashed bg-slate-100 border-gray-300 p-12 text-center'>
                    <div className='relative 
                    w-8/12 bg-opacity-50 aspect-[770/1600] pointer-events-none'>
                        <AspectRatio ref={tshirtRef} className='aspect-[770/1600] border-4 border-white pointer-events-none z-20 relative'>
                            <Image alt='' fill src={options.color.timage} className='pointer-events-none z-20 w-full select-none' />
                        </AspectRatio>
                    </div>
                    <div ref={containerRef}
                        className='absolute border-4 border-white 
                         border-opacity-60 mx-auto z-20 w-48 aspect-[770/1100] overflow-hidden'
                        ratio={770 / 1600}>
                        <Rnd default={{
                            x: 150,
                            y: 205,
                            height: imageDimensions.height / 4,
                            width: imageDimensions.width / 4,
                        }}
                            onResizeStop={(_, __, ref, ___, { x, y }) => {
                                setRenderedDimension({
                                    height: parseInt(ref.style.height.slice(0, -2)),
                                    width: parseInt(ref.style.width.slice(0, -2)),
                                })
                                setRenderedPosition({ x, y })
                            }}

                            onDrag={(_, data) => {
                                const { x, y } = data
                                setRenderedPosition({ x, y })
                            }}
                            resizeHandleComponent={{
                                bottomLeft: <HandleComponent />,
                                bottomRight: <HandleComponent />,
                                topLeft: <HandleComponent />,
                                topRight: <HandleComponent />,
                            }}
                            className='absolute z-30 border-[1px] border-primary'
                            lockAspectRatio
                        >
                            <div className='relative z-50 w-full h-full'>
                                <Image style={{ clipPath: 'inset(0% round 0px' }}
                                    src={imageUrl} fill alt='Design image'
                                    className='pointer-events-none' />
                            </div>
                        </Rnd>
                    </div>
                </div>

                <div className='col-span-1 h-[600px] flex flex-col bg-white relative'>
                    <ScrollArea className='relative flex-1 overflow-auto'>
                        <div className='px-8 pb-12 pt-8'>
                            <h2 className='font-semibold text-2xl'>Customize your case</h2>
                            <div className='flex flex-col gap-6'>
                                <RadioGroup value={options.color} onChange={(val) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color: val
                                    }))
                                }}>
                                    <Label>Color: {options.color.label}</Label>
                                    <div className='flex flex-row  mt-4 space-x-3'>
                                        {TCOLORS.map((color) => (
                                            <RadioGroup.Option value={color}
                                                className={({ active, checked }) =>
                                                    cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 p-0.5',
                                                        { [`${color.twborder}`]: active || checked }
                                                    )
                                                }
                                                key={color.label}>
                                                <span className={cn(`${color.tw}`, 'h-8 w-8 border border-black border-opacity-10 rounded-full')}>

                                                </span>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>

                            </div>

                            <div className='relative flex flex-col gap-3 w-full'>
                                <Label>Model</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='w-full justify-between'
                                            variant='outline' role='combobox' >
                                            {options.size.label}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {TSIZES.map((size) => (
                                            <DropdownMenuItem onClick={() => {
                                                setOptions((prev) => ({ ...prev, size }))
                                            }} className={cn(
                                                "flex md:w-72 sm:w-72 w-96 xl:w-96 text-sm gap-1 items-center", {
                                                'bg-zinc-200': size.label === options.size.label
                                            }
                                            )} key={size.label}>
                                                <Check className={cn(
                                                    "mr-2 h-4 w-4", size.label === options.size.label ? 'opacity-100' : 'opacity-0'
                                                )} />
                                                {size.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>
                    </ScrollArea>

                    <div className='w-full px-8 h-16 bg-white'>
                        <div className='h-px w-full bg-zinc-200'> </div>
                        <div className='w-full h-full flex justify-end items-center'>
                            <div className='w-full flex gap-6 items-center'>
                                <p className='font-semibold'>
                                    {formatPrice((TSHIRT_BASE_PRICE)
                                    )}
                                </p>
                                <Button onClick={() => saveConfig({
                                    configId,
                                    tshirtColor: options.color.value,
                                    size: options.size.value,
                                    type: productType,
                                    basePrice: TSHIRT_BASE_PRICE,
                                    totalPrice: TSHIRT_BASE_PRICE,
                                })} size='sm' className='w-full' disabled={isPending}>
                                    Continue
                                    <ArrowRight className='h-4 w-4 ml-1 inline' />
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TshirtDesignConfig