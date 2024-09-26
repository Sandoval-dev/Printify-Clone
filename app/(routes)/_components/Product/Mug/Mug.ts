export const MUG_BASE_PIRCE = 9.00

type MColor = {
    label: string; value: string;
    tw: string; twborder: string, timage: string
}

export const MCOLORS: MColor[] = [
    { label:'White', value: 'white', tw: 'bg-white', twborder:'border-white', timage:'/mug/white.png' },
    { label:'Black', value: 'black', tw: 'bg-black', twborder:'border-black', timage:'/mug/black.png' },
    { label:'Red', value:'red', tw: 'bg-red-500', twborder:'border-red-500', timage:'/mug/red.png' },
    { label:'Blue', value:'blue', tw: 'bg-sky-500', twborder:'border-sky-500', timage:'/mug/blue.png'},
    { label:'Green', value:'green', tw: 'bg-green-500', twborder:'border-green-500', timage:'/mug/green.png'},
]