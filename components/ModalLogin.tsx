import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { UserIcon, X } from 'lucide-react';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { SignIn } from '@clerk/nextjs';

interface ModalLoginProps {
    redirectUrl?: string;
}

const ModalLogin = ({ redirectUrl }: ModalLoginProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Login <UserIcon className='h-4 w-4 ml-2 inline' /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='justify-center items-center w-full flex'>
                <AlertDialogCancel asChild>
                 <Button className='absolute top-2 right-2 p-2'>
                    <X className='w-4 h-4'/>
                 </Button>
                </AlertDialogCancel>
                <SignIn routing='hash' redirectUrl={redirectUrl} />
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ModalLogin