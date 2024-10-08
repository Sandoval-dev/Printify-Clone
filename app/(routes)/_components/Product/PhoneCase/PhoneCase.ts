export const PHONE_PRICES = {
    material: {
        silicone: 0,
        polycarbonate: 7.00,
    },
    finish: {
        smooth: 0,
        textured: 4.00
    },
} as const

export const PHONE_BASE_PRICE = 12.00

type Color = { label: string, value: string, tw: string; twborder:string}

export const COLORS: Color[] = [
    {
        label: 'Black', value: 'black', tw: 'bg-zinc-900', twborder: 'border-zinc-900'
    },
    {
        label: 'Blue', value: 'blue', tw: 'bg-blue-950', twborder: 'border-blue-950'
    },
    {
        label: 'Rose', value: 'rose', tw: 'bg-rose-950', twborder: 'border-rose-950'
    },
    {
        label: 'Yellow', value: 'yellow', tw: 'bg-yellow-300', twborder:'border-yellow-300'
    }
]

type Model = { label: string, value: string }

export const MODELS: Model[] = [
    {
        label: 'iPhone X', value: 'iPhonex'
    },
    {
        label: 'iPhone 11', value: 'iPhone11'
    },
    {
        label: 'iPhone 12', value: 'iPhone12'
    },
    {
        label: 'iPhone 13', value: 'iPhone13'
    },
    {
        label: 'iPhone 14', value: 'iPhone14'
    },
    {
        label: 'iPhone 15', value: 'iPhone15'
    }
]

type Option = {
    label: string,
    value: string,
    description?:string,
    price: number
}

type Group = {
    name:string;
    options: Option[]
}


export const MATERIALS:Group = {
    name:'material',
    options:[
        {
            label: 'Silicone', 
            value:'silicone',
            description:undefined,
            price: PHONE_PRICES.material.silicone
        },
        {
            label: 'Soft Polycarbonate', 
            value:'polycarbonate',
            description:'Scratch-resistant coating',
            price: PHONE_PRICES.material.polycarbonate
        }
    ]
}as const

export const FINISHES:Group = {
    name:'finish',
    options:[
        {
            label: 'Smooth Finish', 
            value:'smooth',
            description:undefined,
            price: PHONE_PRICES.finish.smooth
        },
        {
            label: 'Textured Finish', 
            value:'textured',
            description:'Glossy finish with textured glass',
            price: PHONE_PRICES.finish.textured
        }
    ]
}as const