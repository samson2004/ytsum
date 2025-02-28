'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";
import SummarizerPage from "@/components/shared/SummarizerPage";

export default function Home() {
  const user=useUser();


  return (
    <div className="max-w-6xl h-screen mx-auto p-10">
      <Sidebar user={user}/>
      <SummarizerPage />
    </div>

    
  );
}
