import { prismadb } from '@/lib/prismadb'
import React from 'react'
import Widget from '../../_components/Widget'

const DashboardPage = async () => {

  const totalConfigurations = await prismadb.configuration.count()
  const totalOrders = await prismadb.order.count()

  const iyzicoPayments = await prismadb.order.count({
    where: { paidType: 'iyzico', isPaid: true },
  })

  const stripePayments = await prismadb.order.count({
    where: { paidType: 'stripe', isPaid: true },
  })

  const Widgetdata = [
    { label: 'Total Configurations', value: totalConfigurations },
    { label: 'Total Orders', value: totalOrders },
    { label: 'Iyzico Payments', value: iyzicoPayments },
    { label: 'Stripe Payments', value: stripePayments },
    // Add more widgets as needed...
  ]

  return (
    <div className='p-8 space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {
            Widgetdata.map((data) => (
              <Widget label={data.label} value={data.value}/>
            ))
          }
      </div>

    </div>
  )
}

export default DashboardPage