import PaymentForm from '@/app/(routes)/_components/PaymentForm';
import { prismadb } from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react'

interface CheckOutPageProps {
    params: {
        configId: string;
        product: string;
    }
}

const CheckOutPage = async ({ params }: CheckOutPageProps) => {


    const configId = params.configId

    if (!isValidObjectId(configId)) {
        return notFound();
    }

    const configurations = await prismadb.configuration.findUnique({
        where: {
            id: configId,
        },
    })

    if (!configurations) {
        return notFound();
    }

    const {totalPrice}=configurations

    const user=await currentUser()

    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-3 gap-8'>
                <div className='md:col-span-2 col-span-3'>
                    <div className='border bg-slate-200 p-4 mt-8 rounded-2xl'>
                         <PaymentForm totalPrice={totalPrice} userId={user?.id} configId={params.configId} product={params.product}/>
                    </div>

                </div>
                <div className='col-span-1'>

                </div>
            </div>

        </div>
    )
}

export default CheckOutPage
