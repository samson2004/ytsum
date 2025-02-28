'use server';

import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req) {
    try {
        const { ytid } = await req.json();

        if (!ytid) {
            return NextResponse.json({ error: "Missing YouTube ID" }, { status: 400 });
        }

        console.log("Fetching transcript for:", ytid);
        const transcriptData = await YoutubeTranscript.fetchTranscript(ytid);

        if (!transcriptData || transcriptData.length === 0) {
            return NextResponse.json({ transcript: "" }, { status: 404 });
        }

        const transcript = transcriptData.map((item) => item.text).join(" ");
        return NextResponse.json({ transcript }, { status: 200 });

    } catch (error) {
        console.error("Transcript fetch error:", error);
        return NextResponse.json({ transcript: "" }, { status: 500 });
    }
}
