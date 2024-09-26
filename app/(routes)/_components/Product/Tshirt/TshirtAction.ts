'use server'

import { prismadb } from "@/lib/prismadb"
import { ProductType, TshirtColor, TshirtSize } from "@prisma/client"



export type SaveConfigArgs = {
    tshirtColor: TshirtColor,
    size: TshirtSize,
    configId: string,
    type: ProductType,
    basePrice: number,
    totalPrice: number,
}


export async function saveConfig({ tshirtColor, size, configId, type, basePrice, totalPrice }: SaveConfigArgs) {

    await prismadb.configuration.update({
        where: { id: configId },
        data: { tshirtColor, size, type, basePrice, totalPrice }
    })
}