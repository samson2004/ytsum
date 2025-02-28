  import { NextResponse } from "next/server";
  import { YoutubeTranscript } from "youtube-transcript";

  //fucking alwys name it route.js/ts 
  export async function POST(req) {
    const res=NextResponse.next();
    res.headers.append('Access-Control-Allow-Origin','*');
    res.headers.append('Access-Control-Allow-Method','GET,DELETE,PATCH,POST,PUT');
      try {
          const { ytid } = await req.json();
          if (!ytid) {
              return NextResponse.json({ transcript: "" }, { status: 400 });// missing id
          }

          console.log("Fetching transcript for:", ytid);
          const transcriptData = await YoutubeTranscript.fetchTranscript(ytid);
          // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
          // console.log("transcript ::",transcriptData);
          // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

          if (!transcriptData || transcriptData.length === 0) {
              return NextResponse.json({ transcript: "" }, { status: 404 }); // no transcript
          }

          const transcript = Array.isArray(transcriptData) 
                              ? transcriptData.map((item) => item.text).join(" ") 
                              : "";
          
          return NextResponse.json({ transcript:transcript }, { status: 200 }); // success

      } catch (error) {
          console.error("Transcript fetch error:", error);
          return NextResponse.json({ transcript: "" }, { status: 500 }); // transcript fetch failed
      }
  }

  export const config={
    matcher:['/api/:path']
  }