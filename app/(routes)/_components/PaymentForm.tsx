"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'


interface PaymentFormProps {
    configId: string;
    product: string;
    totalPrice: string;
    userId: string;

}

const paymentSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    street: z.string().min(2, {
        message: "street must be at least 2 characters.",
    }),
    city: z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    postalCode: z.string().min(2, {
        message: "postalCode must be at least 2 characters.",
    }),
    country: z.string().min(2, {
        message: "country must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    phoneNumber: z.string().min(2, {
        message: "phoneNumber must be at least 2 characters.",
    }),
    paymentMethod: z.string().min(2, {
        message: "paymentMethod must be at least 2 characters.",
    }),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
}).refine((data) => {
    if (data.paymentMethod === "iyzico") {
        return !!data.cardNumber && !!data.expiryDate && !!data.cvv
    }
    return true
}, {
    path: ["cardNumber"],
    message: "Card details are required when usin Iyzico"
}
)

const PaymentForm = ({ configId, product, totalPrice, userId }: PaymentFormProps) => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("stripe")

    const { toast } = useToast()
    const [response, setResponse] = useState(null)
    const router = useRouter()

    const paymentMethods = [
        { label: 'Stripe', value: 'stripe', imgSrc: '/stripe.jpg' },
        { label: 'Iyzico', value: 'iyzico', imgSrc: '/iyzico.jpg' },
        // add more payment methods here...
    ]
    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            name: "Osman",
            street: "Ataevler",
            city: "Bursa",
            postalCode: "16000",
            country: "Turkey",
            state: "Baris",
            phoneNumber: "55544433322211",
            paymentMethod: "stripe",
            cardNumber: "5526080000000006",
            expiryDate: "10/29",
            cvv: "454",
        },
    })

    const watchPaymentMethod = useWatch({
        control: form.control,
        name: "paymentMethod",
    })

    const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
        // handle form submission here
        if (data.paymentMethod === "iyzico") {
            try {
                const [month, year] = data.expiryDate?.split('/')

                const paymentCard = {
                    cardHolderName: data.name,
                    cardNumber: data.cardNumber,
                    expireMonth: month.trim(),
                    expireYear: `${year.trim()}`,
                    cvc: data.cvv,
                    registerCard: '0'
                }

                const buyer = {
                    id: userId,
                    name: data.name,
                    surname: 'Kilic',
                    gsmNumber: data.phoneNumber,
                    email: 'fasil@gmail.com',
                    identityNumber: '1234567890',
                    lastLoginData: '2015-10-05 12:43:35',
                    registrationDate: '2023-04-21 15:12:09',
                    registrationAddress: `${data.state} ${data.street}`,
                    ip: '85.34.78.112',
                    city: data.city,
                    country: data.country,
                    zipCode: data.postalCode
                }

                const shippingAddress = {
                    contactName: data.name,
                    city: data.city,
                    zipCode: data.postalCode,
                    address: data.country + data.city + data.state + data.street,
                    country: data.country,
                    state: data.state
                }

                const billingAddress = {
                    contactName: data.name,
                    city: data.city,
                    zipCode: data.postalCode,
                    address: data.country + data.city + data.state + data.street,
                    country: data.country,
                }

                const basketItems = [
                    {
                        id: configId,
                        name: product,
                        price: totalPrice,
                        category1: 'Collectibles',
                        category2: 'Accessories',
                        itemType: 'PHYSICAL'
                    }
                ]

                const paymentData = {
                    price: totalPrice,
                    paidPrice: totalPrice,
                    currency: 'TRY',
                    basketId: 'B67832',
                    paymentCard: paymentCard,
                    buyer: buyer,
                    shippingAddress: shippingAddress,
                    billingAddress: billingAddress,
                    basketItems: basketItems
                }

                const response = await axios.post('http://localhost:3001/api/payment', paymentData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if (response.data.status === 'success') {

                    const orderData = {
                        configurationId: configId,
                        userId: userId,
                        amount: totalPrice,
                        paidType: 'iyzico',
                        status: 'waiting',
                        address: {
                            name: data.name,
                            street: data.street,
                            city: data.city,
                            postalCode: data.postalCode,
                            country: data.country,
                            state: data.state,
                            phoneNumber: data.phoneNumber
                        }
                    }

                    const responseOrder=await axios.post('/api/saveorder', orderData,{
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    toast({
                        variant:'success',
                        title: 'Order Placed',
                        description: "Your order has been placed successfully."
                    })

                    console.log(responseOrder.data.id)
                } else {
                    toast({
                        variant: 'destructive',
                        title: 'Order Error',
                        description: response.data.message || "Error"
                    })
                }



            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Order Error',
                    description: `Error: ${error.message || error}`
                })
            }

        }
        if (data.paymentMethod === "stripe") {

        }

        // call your API with the values
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your street" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your postalCode" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your country" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your state" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <RadioGroup value={selectedPaymentMethod} onChange={(val) => {
                                setSelectedPaymentMethod(val)
                                field.onChange(val)
                            }}>
                                <div className='flex flex-row mt-4 space-x-3'>
                                    {
                                        paymentMethods.map((method) => (
                                            <RadioGroup.Option className={({ active, checked }) =>
                                                `relative -m-0.5 flex cursor-pointer items-center justify-center border-2 ${active || checked ? 'border-mycolor-100' : 'border-gray-200'}`}
                                                value={method.value}
                                                key={method.value}>
                                                <div>
                                                    <Image src={method.imgSrc} alt='' width={150} height={100} />
                                                </div>

                                            </RadioGroup.Option>
                                        ))
                                    }
                                </div>

                            </RadioGroup>
                        </FormItem>
                    )}
                />
                {
                    watchPaymentMethod === "iyzico" && (
                        <>
                            <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your card number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter CVV" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )
                }
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}

export default PaymentForm
