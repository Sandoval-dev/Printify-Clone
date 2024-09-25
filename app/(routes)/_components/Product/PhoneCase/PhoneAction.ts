'use server'

import { prismadb } from "@/lib/prismadb"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel, ProductType } from "@prisma/client"


export type SaveConfigArgs = {
    casecolor: CaseColor
    casefinish: CaseFinish
    casematerial: CaseMaterial
    casemodel: PhoneModel
    configId: string
    type: ProductType
}

export async function saveConfig({ casecolor, casefinish,
    casematerial, casemodel, configId, type }: SaveConfigArgs) {

    await prismadb.configuration.update({
        where: {
            id: configId,
        },
        data: {
            casecolor,
            casefinish,
            casematerial,
            casemodel,
            type,
        },
    })
}