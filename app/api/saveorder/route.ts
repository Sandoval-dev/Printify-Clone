import { prismadb } from "@/lib/prismadb";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const { userId } = getAuth(req)

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { address, configurationId, amount, paidType, status } = await req.json()


        const createdAddress = await prismadb.address.create({
            data: {
                name: address.name,
                street: address.street,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                country: address.country,
                phoneNumber: address.phoneNumber
            }
        })

        const order = await prismadb.order.create({
            data: {
                userId,
                addressId: createdAddress.id,
                configurationId,
                amount,
                paidType,
                status: status || 'waiting',
                isPaid: true
            }
        })

        return NextResponse.json(order)

    } catch (error) {
         
        console.error(error)
        return new NextResponse("Failed to create order", { status: 500 })
    }




}