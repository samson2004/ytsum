'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Loader } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
export default function Home() {
 return (
  <div className="min-h-screen flex">
  <div className="w-2/5 bg-gray-200 flex items-center justify-center">
    <Image
    height={800}
    width={1900}
      src="/nicetree-pexel.jpg"
      alt="Landing Page Image"
      className="w-full h-full"
    />
  </div>
  
  <div className="w-max mx-auto flex flex-col items-center justify-center p-6 bg-white">
    <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
    <p className="text-gray-600 mb-6">Sign in or sign up to continue.</p>
      <div className="">
        <SignIn ></SignIn>
      </div>
    </div>
  </div>

 )
    
}
