import React from 'react'

interface ProductPageProps {
    params: {
        configId: string;
        product: string
    }
}

const ProductPage = ({params}:ProductPageProps) => {
    return (
        <div>
            {
                params.configId
            }
            <br/>
            {
                params.product
            }
        </div>
    )
}

export default ProductPage
