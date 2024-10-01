import { useToast } from '@/hooks/use-toast'
import React, { useState } from 'react'

interface StatusUpdaterProps{
    initialStatus:string,
    orderId:string
}

const StatusUpdater = ({initialStatus,orderId}:StatusUpdaterProps) => {
    const [status, setStatus]=useState(initialStatus)
    const {toast}=useToast()
  return (
    <div>StatusUpdater</div>
  )
}

export default StatusUpdater