'use client'
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Hero from "../_components/Home/Hero";
import Services from "../_components/Home/Services";

export default function Home() {

  const { toast } = useToast()

  return (
    <>
     <Hero/>
     <Services/>
    </>
  );
}
