import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { prismadb } from '@/lib/prismadb'


const MyOrderPage = async () => {

    const user = await currentUser()

    if (!user) {
        return notFound()
    }

    const orderDb = await prismadb.order.findMany({
        where: {
            userId: user.id,
        },
        include: {
            configuration: true
        }
    })

    const phonceCases = orderDb.filter(order => order.configuration.type === "phoneCase")

    const mugs = orderDb.filter(order => order.configuration.type === "mug")

    const tshirts = orderDb.filter(order => order.configuration.type === "tshirt")


    return (
        <div className='mx-auto mt-16'>
            <div className='space-y-12'>
                {
                    phonceCases.length > 0 && (
                        <>
                            <h2 className='text-2xl font-semibold text-center'>Phone Case</h2>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        phonceCases.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">Phone Case</TableCell>
                                                <TableCell>{order.configuration.casecolor?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casefinish?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casematerial?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casemodel?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.basePrice}</TableCell>
                                                <TableCell>{order.configuration.totalPrice}</TableCell>
                                                <TableCell>{order.paidType}</TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                +
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                        </>
                    )
                }

                {
                    mugs.length > 0 && (
                        <>
                            <h2 className='text-2xl font-semibold text-center'>Mug</h2>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        phonceCases.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">Phone Case</TableCell>
                                                <TableCell>{order.configuration.casecolor?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casefinish?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casematerial?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casemodel?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.basePrice}</TableCell>
                                                <TableCell>{order.configuration.totalPrice}</TableCell>
                                                <TableCell>{order.paidType}</TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                +
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </>
                    )
                }

                {
                    tshirts.length > 0 && (
                        <>
                            <h2 className='text-2xl font-semibold text-center'>T-Shirt</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Name</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        phonceCases.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">Phone Case</TableCell>
                                                <TableCell>{order.configuration.casecolor?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casefinish?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casematerial?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.casemodel?.toUpperCase()}</TableCell>
                                                <TableCell>{order.configuration.basePrice}</TableCell>
                                                <TableCell>{order.configuration.totalPrice}</TableCell>
                                                <TableCell>{order.paidType}</TableCell>
                                                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                                                +
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>

                        </>
                    )
                }
            </div>


        </div>
    )
}

export default MyOrderPage
