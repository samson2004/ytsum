'use client';

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { YoutubeTranscript } from "youtube-transcript";
import { toast } from "sonner";


export default function SummarizerPage() {

  const [url,seturl]=useState("");
  const [youid,setyouid]=useState("");
  const [ispending,starttransition]=useTransition();
  const [response,setresponse]=useState([]);
  const [generatedtranscript,setgeneratedtranscript]=useState("");

   const handleGenerate=()=>{

    const youid=url.split('v=')[1];
    console.log("youid::",youid);
    setyouid(youid);

    starttransition(async()=>{
        
      try {
          const transcriptData = await YoutubeTranscript.fetchTranscript(youid);
          if(!transcriptData){
            toast.error("Transcript not found");
          }
          const summary = transcriptData.map((element)=>element.text).join(" ");
          console.log("summary::",summary);
          setgeneratedtranscript(summary);
        } catch (error) {
          
        }
      })

   }

  return (
    <div className=" flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">YouTube Video Summarizer</h1>
      <p className="text-gray-600 mb-6">Enter a YouTube video link to generate a quick summary.</p>
      <div className="w-full max-w-lg flex space-x-2">
        <Input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => seturl(e.target.value)}
        />
        <Button onClick={handleGenerate} disabled={ispending}>{ispending?"Generating....":"Generate"}</Button>
      </div>
      {true && (
        <Card className="mt-6 w-full max-w-6xl">
          <CardContent className="p-4  ">
            <h2 className="text-lg font-semibold mb-2">Generated Summary</h2>
            <div className="flex space-x-5">
                {youid.length!=0?<Image src={`https://img.youtube.com/vi/${youid}/0.jpg`}  height={500} width={500} alt="youtube thumbnail"/>:
                <div>Loading....</div>}
                {generatedtranscript.length!=0?<p className="text-gray-700">{generatedtranscript}</p>:<div>Loading transcript....</div>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
