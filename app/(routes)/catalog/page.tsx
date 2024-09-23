'use client'
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { UploadButton, useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { ImageIcon } from '@radix-ui/react-icons';
import { Loader2, MousePointerSquareDashed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import Dropzone, { useDropzone, FileRejection } from 'react-dropzone'



const CatalogPage = () => {

  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/catalog/${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropAccepted=(acceptedFiles:File[])=>{
    startUpload(acceptedFiles, {configId:undefined})
      setIsDragOver(false)
  }

  const onDropRejected=(rejectedFiles:FileRejection[]) => {
    const [file]=rejectedFiles
    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported`,
      description: 'Please choose a file with a supported format (png, jpeg, jpg)',
      variant:'destructive'
    })
  }


  return (
    <div className='container mx-auto'>
      <div className={cn('relative h-[500px] flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center', {
        'ring-blue-900/25 bg-blue-900/10': isDragOver
      })}>
        <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
          <Dropzone onDropAccepted={onDropAccepted} onDropRejected={onDropRejected} accept={{
            'image/png':['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg']
          }} onDragLeave={()=>setIsDragOver(false)} onDragEnter={()=> setIsDragOver(true)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className='relative flex flex-1 flex-col items-center justify-center'>
                <input {...getInputProps()} />
                {
                  isDragOver ? (
                    <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
                  ) : isUploading || isPending ? (
                    <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
                  ) : (
                    <ImageIcon className='h-6 w-6 text-zinc-500 mb-2' />
                  )
                }
                <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                  {
                    isUploading ? (
                      <div className='flex flex-col items-center'>
                        <p>Uploading</p>
                        <Progress value={uploadProgress} className='mt-4 w-44 h-2 bg-gray-400' />
                      </div>) : isPending ? (
                        <div className='flex flex-col items-center'>
                          <p>Redirecting please wait</p>
                        </div>
                      ) : isDragOver ? (
                        <div className='flex flex-col items-center'>
                          <p>Drop File</p>
                        </div>
                      ) : (
                      <div>
                          Click to upload or drag and drop
                      </div>)
                  }
                  {
                    isUploading ? null :(
                      <p className='text-center'>PNG JPG JPEG</p>
                    )
                  }
                </div>
              </div>
            )}
          </Dropzone>
        </div>
      </div>

    </div>

  )
}

export default CatalogPage