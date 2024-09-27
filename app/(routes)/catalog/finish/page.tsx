import { Check } from 'lucide-react'
import React from 'react'

const FinishPage = () => {
    return (
        <div className='container mx-auto'>
            <div className='w-full flex flex-col space-y-7 items-center justify-center mt-14'>
                <Check className='h-36 w-36 bg-mycolor-100 rounded-full text-white p-4' />
                <div>
                    <p className='text-5xl text-mycolor-100 font-semibold'>Order Success</p>
                </div>
                <div className='w-4/6 mt-8'>
                    <p className='text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel, perferendis ad quo cumque nisi accusantium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, laboriosam!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default FinishPage
