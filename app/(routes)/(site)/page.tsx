'use client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function Home() {

  const { toast } = useToast()

  return (
    <>
      <Button variant='success' onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          variant: 'success',
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}>Tıkla bana</Button>
    </>
  );
}
