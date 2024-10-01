'use client'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'


interface WidgetProps {
    label: string
    value: number
}
const Widget = ({ label, value }: WidgetProps) => {

    const [displayValue, setDisplayValue] = useState(0)
    const controls = useAnimation()

    useEffect(() => {
        const duration = 1
        const stepTime = duration / value
        let current = 0

        const interval = setInterval(() => {
            current += 1
            setDisplayValue(current)

            if (current >= value) {
                clearInterval(interval)
            }
        }, stepTime * 1000)

        controls.start({ opacity: 1, y: 0 })
    }, [value, controls])
    return (
        <div className='border shadow-lg rounded-lg w-full flex flex-col p-8 space-y-7 bg-gradient-to-r from-slate-800 to-slate-500
         text-white transform hover:scale-105 transition-transform duration-500'>
            <div className='text-center'>
                <p className='text-lg font-semibold uppercase tracking-wide'>{label}</p>
            </div>
            <div className='text-center'>
                <motion.p className='text-3xl font-bold' initial={{opacity:0,y:20}} animate={controls} transition={{duration:1}}>
                        {displayValue.toLocaleString()}
                </motion.p>
            </div>

        </div>
    )
}

export default Widget