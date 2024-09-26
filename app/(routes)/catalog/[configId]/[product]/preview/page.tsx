import PhonePreview from '@/app/(routes)/_components/Product/PhoneCase/PhonePreview';
import TshirtPreview from '@/app/(routes)/_components/Product/Tshirt/TshirtPreview';
import { prismadb } from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';
import { notFound } from 'next/navigation';
import React from 'react'

interface PreviewPageProps {
    params: {
        configId: string;
        product: string
    }
}

const PreviewPage = async({ params }: PreviewPageProps) => {

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

    if (params.product === "phone") {
        return (
            <PhonePreview configuration={configurations}/>
        )
    }
    else if (params.product === "mug") {
        return (
            <div>Mug</div>
        )
    }
    else if (params.product === "tshirt") {
        return (
           <TshirtPreview configuration={configurations}/>
        )
    }
    else {
        return notFound()
    }


    return (
        <div>
            preview
        </div>
    )
}

export default PreviewPage
