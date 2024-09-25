'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import HandleComponent from '../HandleComponent'
import { ScrollArea } from '@/components/ui/scroll-area'
import { COLORS, FINISHES, MATERIALS, MODELS, PHONE_BASE_PRICE } from './PhoneCase'
import { Radio, RadioGroup } from '@headlessui/react'
import { Label } from '@/components/ui/label'
import { cn, formatPrice } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'



interface PhoneDesignConfigProps {
    configId: string,
    imageUrl: string,
    imageDimensions: {
        width: number,
        height: number
    }

}

const PhoneDesignConfig = ({ configId, imageDimensions, imageUrl }: PhoneDesignConfigProps) => {

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

    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number]
        model: (typeof MODELS)[number]
        material: (typeof MATERIALS)[number]
        finish: (typeof FINISHES)[number]
    }>({
        color: COLORS[0],
        model: MODELS[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0]
    })

    return (
        <div className='container mx-auto'>
            <div className='relative mt-20 grid grid-cols-1 
            lg:grid-cols-3 mb-20 pb-20'>
                <div ref={containerRef}
                    className='col-span-2 relative h-[600px] overflow-hidden w-full
                  max-w-4xl flex items-center justify-center
                   rounded-lg border-2 border-dashed border-gray-300 p-12 text-center'>
                    <div className='relative 
                    w-60 bg-opacity-50 aspect-[896/1831] pointer-events-auto'>
                        <AspectRatio ref={phoneCaseRef} ratio={896 / 1831}
                            className='aspect-[896/1831] pointer-events-none z-50 relative'>
                            <Image alt='' fill src="/phone-template.png"
                                className='pointer-events-none z-50 select-none' />
                        </AspectRatio>
                        <div className='absolute z-40 inset-0 left-[2px] top-px 
                        bottom-px right-[2px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.7)]'></div>
                        <div className={cn(' left-[2px] absolute inset-0 top-px bottom-px right-[2px] rounded-[32px]',
                            `${options.color.tw}`
                        )}>

                        </div>
                    </div>
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
                        className='absolute z-20 border-[3px] border-primary'
                        lockAspectRatio
                    >
                        <div className='relative w-full h-full'>
                            <Image src={imageUrl} fill alt='your image'
                                className='pointer-events-none' />
                        </div>
                    </Rnd>
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
                                        {COLORS.map((color) => (
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
                                <div className='relative flex flex-col gap-3 w-full'>
                                    <Label>Model</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className='w-full justify-between'
                                                variant='outline' role='combobox' >
                                                {options.model.label}
                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {MODELS.map((model) => (
                                                <DropdownMenuItem onClick={() => {
                                                    setOptions((prev) => ({ ...prev, model }))
                                                }} className={cn(
                                                    "flex md:w-72 sm:w-72 w-96 xl:w-96 text-sm gap-1 items-center", {
                                                    'bg-zinc-200': model.label === options.model.label
                                                }
                                                )} key={model.label}>
                                                    <Check className={cn(
                                                        "mr-2 h-4 w-4", model.label === options.model.label ? 'opacity-100' : 'opacity-0'
                                                    )} />
                                                    {model.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                </div>

                                <div>
                                    {[MATERIALS, FINISHES].map(({ name, options: selecttableOptions }) => (
                                        <RadioGroup key={name} value={options[name]} onChange={(val) => {
                                            setOptions((prev) => ({
                                                ...prev,
                                                [name]: val
                                            }))
                                        }}>
                                            <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                                            <div className='mt-3 space-y-4'>
                                                {selecttableOptions.map((option) => (
                                                    <RadioGroup.Option
                                                        className={({ active, checked }) =>
                                                            cn("relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between", {
                                                                'border-mycolor-100': active || checked
                                                            })}
                                                        value={option}
                                                        key={option.value}>
                                                        <span className='flex items-center'>
                                                            <span className='flex flex-col text-sm'>
                                                                <RadioGroup.Label className="font-semibold text-gray-700">
                                                                    {option.label}
                                                                </RadioGroup.Label>
                                                                {
                                                                    option.description ? (
                                                                        <RadioGroup.Description className="text-xs text-gray-600">
                                                                            {option.description}
                                                                        </RadioGroup.Description>
                                                                    ) : null
                                                                }
                                                            </span>
                                                        </span>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className='w-full px-8 h-16 bg-white'>
                        <div className='h-px w-full bg-zinc-200'> </div>
                        <div className='w-full h-full flex justify-end items-center'>
                            <div className='w-full flex gap-6 items-center'>
                                <p className='font-semibold'>
                                    {formatPrice((PHONE_BASE_PRICE + options.finish.price
                                        + options.material.price) / 100
                                    )}
                                </p>
                                <Button size='sm' className='w-full'>
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

export default PhoneDesignConfig