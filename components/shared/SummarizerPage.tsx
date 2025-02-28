'use client';

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

export default function SummarizerPage() {
  const [url, seturl] = useState("");
  const [youid, setyouid] = useState("");
  const [ispending, starttransition] = useTransition();
  const [genaisummarydata, setgenaisummarydata] = useState(null);
  const [generatedtranscript, setgeneratedtranscript] = useState("");

  const handleGenerate = () => {
    const youid = url.split("v=")[1];
    console.log("youid::", youid);
    setyouid(youid);

    starttransition(async () => {
      try {
        const transcriptDataresponse = await fetch("/api/transreq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ytid: youid }),
        });

        if (transcriptDataresponse.status === 200) {
          const transcriptData = await transcriptDataresponse.json();
          if (!transcriptData || !transcriptData.transcript) {
            toast.error("Transcript not found");
            return;
          }

          console.log("transcript::", transcriptData);
          setgeneratedtranscript(transcriptData.transcript);

          const response = await fetch("https://green-base-7f2d.samsonzacharia1973.workers.dev/summarygenerator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript: transcriptData.transcript }),
          });

          if (response.status === 200) {
            const data = await response.json();
            console.log("summary::", data);//response and usage
            setgenaisummarydata(data);
          } else {
            toast.error("Failed to get summary");
          }
        } else {
          toast.error("Failed to get request");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in /api/transcript request!");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">YouTube Video Summarizer</h1>
      <p className="text-gray-600 mb-6">Enter a YouTube video link to generate a quick summary.</p>
      <div className="w-full max-w-lg flex space-x-2">
        <Input type="text" placeholder="Paste YouTube URL here..." value={url} onChange={(e) => seturl(e.target.value)} />
        <Button onClick={handleGenerate} disabled={ispending}>{ispending ? "Generating...." : "Generate"}</Button>
      </div>

      {true && (
        <Card className="mt-6 w-full">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Transcript</h2>
            <div className="space-x-5 space-y-5">
              {youid.length !== 0 ? (
                <>
                  <p className="font-semibold pl-4">Video thumbnail</p>
                  <Image src={`https://img.youtube.com/vi/${youid}/0.jpg`} height={500} width={500} alt="youtube thumbnail" className="overflow-hidden" />
                </>
              ) : (
                <>
                  <p>Transcript :</p>
                  <div>Loading....</div>
                </>
              )}
              {generatedtranscript.length !== 0 ? <p className="text-gray-700">{generatedtranscript}</p> : <div>Loading transcript....</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {true && (
        <Card className="mt-6 w-full">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Summary by GenAI:</h2>
            <div>
              {genaisummarydata ? (
                <>
                  <h3 className="text-base font-bold mt-4 max-w-6xl bg-gray-300 h-min p-6 rounded-xl">{genaisummarydata?.response}</h3>
                </>
              ) : (
                <div>Loading summary....</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
