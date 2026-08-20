import { NextResponse } from "next/server";
export async function POST(request:Request){if(!process.env.RESEND_API_KEY)return NextResponse.json({error:"Email service is not configured"},{status:503});const {subject,body,audience}=await request.json();if(audience!=="all"||!subject||!body)return NextResponse.json({error:"Invalid request"},{status:400});return NextResponse.json({queued:true});}
