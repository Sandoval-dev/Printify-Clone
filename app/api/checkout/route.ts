import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: Request) {
    try {

        const user = await currentUser()
        const body = await req.json()
        const { orderData } = body

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Printify",
                        description: "Phone Mug Tshirt"
                    },
                    unit_amount: Math.round(orderData.amount * 100)
                }
            }
        ]

        let stripeCustomer = await prismadb.stripeCustomer.findUnique({
            where: {
                userId: user.id
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!stripeCustomer) {
            const customer=await stripe.customers.create({
              email: user.emailAddresses[0].emailAddress
            })

            stripeCustomer = await prismadb.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            })
        }

        const session=await stripe.checkout.sessions.create({
            customer:stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_BASE_URL}/catalog/finish`,
            cancel_url: `${process.env.NEXT_BASE_URL}/?canceled=1`,
            metadata:{
                orderData:JSON.stringify(orderData),
                userId:user.id
            }
        })

        return NextResponse.json({url:session.url})

    } catch (error) {
        
        console.error("[CHECKOUT",error)
        return new NextResponse("An error occurred while processing your request", { status: 500 })
    }
}