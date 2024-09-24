import { products } from '@/constants'
import { prismadb } from '@/lib/prismadb'
import { isValidObjectId } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'


interface CatalogConfigPageProps {
  params: {
    configId: string
  }
}
const ConfigPage = async({ params }: CatalogConfigPageProps) => {

  const configId=params.configId

  if (!isValidObjectId(configId)) {
    return notFound()
  }

  const configurations=await prismadb.configuration.findUnique({
    where:{
      id:configId,
    }
  })
  if (!configurations) return notFound()
  return (
    <div className='container mx-auto'>
      <div className='relative h-[800px] md:h-[500px] flex-1 my-16 w-full rounded-xl
      bg-gray-900/5 p-2 flex justify-center flex-col items-center'>
        <div className='flex flex-col md:flex-row gap-8'>
          {
            products.map((product) => (
              <Link className='flex  flex-col gap-4 group'
                key={product.id} href={`/catalog/${params.configId}/${product.href}`}>
                <Image className='w-36 h-auto 
                  brightness-50 rounded-xl
                   group-hover:brightness-100 transition duration-1000' width={500} height={500} alt={product.title} src={product.image} />

                <div>
                  <p className='text-center font-semibold'>{product.title}</p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
      {params.configId}
    </div>
  )
}

export default ConfigPage