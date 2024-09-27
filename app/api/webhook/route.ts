import { stripe } from "@/lib/stripe";

export async function POST(req:Request){
    try {
        const sig=req.headers.get('stripe-signature');
        const event=await stripe.webhooks.constructEvent(
            await req.text(),
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        
    }
}