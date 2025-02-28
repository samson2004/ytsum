'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {Columns2} from 'lucide-react';

const Sidebar = ({user}:{user:any}) => {
  return (
    <Sheet>
      <SheetTrigger>
      <div className="w-10 h-10 p-2 items-center rounded-2xl hover:bg-gray-100"><Columns2 /></div>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle>Summary Creation & Chat Storage </SheetTitle>
          <SheetDescription>
          This feature allows users to generate concise summaries of YouTube videos by providing a video link. Once a summary is created, it is stored along with the chat history, enabling users to revisit previous summaries and conversations. 
          This ensures seamless access to past insights and discussions, enhancing user experience and productivity.
          </SheetDescription>
        </SheetHeader>

        <div>
          <Button variant={`outline`} className="w-full">new summary</Button>
        </div>
        <div>
            <Button variant={`outline`} className="w-full">view chat history</Button>
        </div>
        <SheetFooter>
          <div className="bg-gray-100 p-10 rounded-3xl">
          <div className="flex space-x-5 items-center">
              <UserButton></UserButton>    
              <div className="flex flex-col text-sm">
                <p>{user.user?.fullName}</p>
                <p>{user.user?.emailAddresses[0].toString()}</p>
              </div>  
          </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Sidebar