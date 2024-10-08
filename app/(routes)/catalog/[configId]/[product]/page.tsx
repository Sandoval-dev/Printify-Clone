import MugDesignConfig from '@/app/(routes)/_components/Product/Mug/MugDesignConfig';
import PhoneDesignConfig from '@/app/(routes)/_components/Product/PhoneCase/PhoneDesignConfig';
import TshirtDesignConfig from '@/app/(routes)/_components/Product/Tshirt/TshirtDesignConfig';
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

const ProductPage = async ({ params }: ProductPageProps) => {

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

    const { imageUrl, width, height } = configurations


    if (params.product === "Phone") {
        return (
            <PhoneDesignConfig productType='phoneCase' key={configurations.id} configId={configurations.id}
                imageUrl={imageUrl} imageDimensions={{ width, height }} />
        )
    }
    else if (params.product === "mug") {
        return (
            <MugDesignConfig productType='mug' key={configurations.id} configId={configurations.id}
            imageUrl={imageUrl} imageDimensions={{ width, height }} />
        )
    }
    else if (params.product === "thsirt") {
        return (
            <TshirtDesignConfig productType='tshirt' key={configurations.id} configId={configurations.id}
            imageUrl={imageUrl} imageDimensions={{ width, height }} />
        )
    }
    else {
        return notFound()
    }

}

export default ProductPage
