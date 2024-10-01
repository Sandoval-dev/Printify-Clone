import { prismadb } from '@/lib/prismadb'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PhoneModal from '../../_components/Phone/PhoneModal'


const PhoneOrderPage = async () => {
    const orders = await prismadb.order.findMany({
        where: {
            configuration: {
                type: 'phoneCase'
            }
        },
        include: {
            configuration: true,
            address: true
        },
        orderBy: {
            configurationId: 'desc'
        }
    })

    const handleStatusChange = async (orderId: string, newStatus: string) => {

    }
    return (
        <div className='container mx-auto mt-16'>
            <h2 className='text-2xl text-center font-semibold mb-6'>
                Phone Cases
            </h2>
            <Accordion type="single" collapsible className='w-full bg-slate-800 text-white px-4 rounded-lg'>
                {orders.map((order) => (
                    <AccordionItem value={order.id} key={order.id}>
                        <AccordionTrigger>
                            <div className='text-left'>
                                <div className='flex justify-between space-x-4'>
                                    <span className='font-semibold'>{order.address.name?.toUpperCase()}</span>
                                    <span>{order.address.phoneNumber}</span>
                                    <span>{order.address.street?.toUpperCase()}</span>
                                    <span>{order.address.city?.toUpperCase()}</span>
                                    <span>{order.address.state?.toUpperCase()}</span>
                                    <span>{order.address.street?.toUpperCase()}</span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Table className='bg-slate-700 text-white rounded-xl'>
                                <TableHeader className='bg-mycolor-100 text-white'>
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
                                        <TableHead className="text-right">Preview</TableHead>
                                        <TableHead className="text-right">Type</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
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
                                            <TableCell><PhoneModal casecolor={order.configuration.casecolor} croppedImageUrl={order.configuration.croppedImageUrl} /></TableCell>

                                        </TableRow>

                                    }
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>

        </div>
    )
}

export default PhoneOrderPage