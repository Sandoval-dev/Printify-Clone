import { services } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Services = () => {
    return (
        <div className='bg-mycolor-200 py-32 relative'>
            <Image alt='' width={2000} height={150} src="/vaves/2.png" className='absolute lg:-top-12 top-0 w-full'/>
            <div className='mx-auto container'>
                <div className='flex flex-col md:flex-row gap-4 '>
                    {
                        services.map((service) => (
                            <div key={service.id}
                                className='flex flex-col items-center border rounded-xl border-mycolor-100 p-4 justify-center space-y-4'>
                                <Image alt='' className='w-40 h-40' src={service.image}
                                    width={500} height={500} />
                                    <h2 className='font-semibold text-2xl'>{service.title}</h2>
                                    <p>{service.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Services