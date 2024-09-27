'use client'
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface CatalogSiteMapProps {
    params: {
        configId: string;
        product: string
    }
}


const CatalogSiteMap = () => {

    const params = useParams<CatalogSiteMapProps>()
    const pathname = usePathname()
    const [currentStep, setCurrentStep] = useState(1)

    const steps = [
        {
            label: 'Upload',
            href: `/catalog`,
            key: 1
        },
        {
            label: 'Product',
            href: `/catalog/${params.configId}`,
            key: 2
        },
        {
            label: 'Design',
            href: `/catalog/${params.configId}/${params.product}`,
            key: 3
        },
        {
            label: 'Preview',
            href: `/catalog/${params.configId}/${params.product}/preview`,
            key: 4
        },
        {
            label: 'Checkout',
            href: `/catalog/${params.configId}/${params.product}/checkout`,
            key: 5
        },
        {
            label: 'Finish',
            href: `/catalog/${params.configId}`,
            key: 6
        }
    ]


    useEffect(() => {
        const matchingStep = steps.findIndex(step => step.href === pathname)
        if (matchingStep !== -1) {
            setCurrentStep(matchingStep + 1)
        }
    }, [pathname, steps])

    const handleStepClick = (stepKey: number) => {
        if (stepKey <= currentStep && currentStep < 6) {
            setCurrentStep(stepKey)
        }
    }

    return (
        <header className='pt-5'>
            <ProgressBar currentStep={currentStep} />
            <nav className='justify-center flex items-center space-x-14'>
                {
                    steps.map((step) => (
                        <StepItem href={step.href} onClick={() => handleStepClick(step.key)}
                            label={step.label} isActive={step.key === currentStep}
                            key={step.key} isClickable={step.key <= currentStep && currentStep<6}
                            number={step.key} />
                    ))
                }
            </nav>
        </header>
    )
}

const ProgressBar = ({ currentStep }: { currentStep: number }) => {

    const progress = (currentStep / 6) * 100
    return (
        <div className='relative mb-5 w-2/3 mx-auto mt-6'>
            <Progress value={progress} />
        </div>
    )
}

const StepItem = ({ href, isActive, isClickable, label, number, onClick }: {
    number: number, label: string, href: string,
    isActive: boolean, isClickable: boolean, onClick: () => void
}) => {
    return (
        <div onClick={isClickable ? onClick : undefined} className='flex flex-col items-center'>
            <Link
                className={cn('w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer bg-slate-300',
                    isActive ? 'bg-mycolor-100 text-white' : isClickable ? "bg-gray-300 text-gray-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )} href={isClickable ? href : '#'}>
                {number}
            </Link>
            <div className={cn("mt-2 text-sm font-medium transition-colors duration-500", isActive ? "text-mycolor-100" : isClickable ? "text-gray-700" : "text-gray-400")}>
                {label}
            </div>
        </div>
    )
}

export default CatalogSiteMap