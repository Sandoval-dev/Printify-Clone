"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


interface PaymentFormProps {
    configId: string;
    product: string;

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

const PaymentForm = ({ configId, product }: PaymentFormProps) => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("stripe")

    const paymentMethods = [
        { label: 'Stripe', value: 'stripe', imgSrc: '/stripe.jpg' },
        { label: 'Iyzico', value: 'iyzico', imgSrc: '/iyzico.jpg' },
        // add more payment methods here...
    ]
    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            name: "",
            street: "",
            city: "",
            postalCode: "",
            country: "",
            state: "",
            phoneNumber: "",
            paymentMethod: "stripe",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        },
    })

    const watchPaymentMethod = useWatch({
        control: form.control,
        name: "paymentMethod",
    })

    function onSubmit(values: z.infer<typeof paymentSchema>) {
        // handle form submission here
        console.log(values)
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
