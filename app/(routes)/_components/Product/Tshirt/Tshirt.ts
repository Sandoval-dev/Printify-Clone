type TColor = {
    label: string, value: string,
    tw: string, twborder: string, timage: string
}

export const TSHIRT_BASE_PRICE=18.00

export const TCOLORS:TColor[] = [
    {label:'White', value: 'white', tw: 'bg-white', twborder:"border-white", timage:"/tshirt/white.png"},
    {label:'Black', value: 'black', tw: 'bg-black', twborder:"border-black", timage:"/tshirt/black.png"},
    {label:'Red', value:'red', tw: 'bg-red-500', twborder:"border-red-500", timage:"/tshirt/red.png"},
    {label:'Blue', value:'blue', tw: 'bg-sky-500', twborder:"border-sky-500", timage:"/tshirt/blue.png"},
    {label:'Green', value:'green', tw: 'bg-green-500', twborder:"border-green-500", timage:"/tshirt/green.png"}
]

type TSize={label:string, value:string}

export const TSIZES:TSize[] = [
    {label:'S', value:'small'},
    {label:'M', value:'medium'},
    {label:'L', value:'large'},
    {label:'XL', value:'xlarge'}
]