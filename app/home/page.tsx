'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";
import SummarizerPage from "@/components/shared/SummarizerPage";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Home() {
  const user=useUser();


  return (
    <>
    
    <SignedIn>
    <div className="max-w-6xl h-screen mx-auto p-10">
    
      <Sidebar user={user}/>
      <SummarizerPage />
      <UserButton></UserButton>
    </div>
    </SignedIn>
    </>

    
  );
}
