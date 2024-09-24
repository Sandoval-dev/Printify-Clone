import PhoneDesignConfig from '@/app/(routes)/_components/Product/PhoneCase/PhoneDesignConfig';
import { prismadb } from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';
import { notFound } from 'next/navigation';
import React from 'react'

interface ProductPageProps {
    params: {
        configId: string;
        product: string
    }
}

const ProductPage = async({ params }: ProductPageProps) => {

    const configId = params.configId

    if (!isValidObjectId(configId)) {
        return notFound()
    }

    const configurations = await prismadb.configuration.findUnique({
        where: {
            id: configId,
        }
    })
    if (!configurations) return notFound()

    const {imageUrl, width, height}=configurations
    return (
        <PhoneDesignConfig key={configurations.id} configId={configurations.id}
         imageUrl={imageUrl} imageDimensions={{width, height}} />
    )
}

export default ProductPage
