import "server-only";

export async function sendInnerCircleFulfilledEmail(input:{
  email:string; orderId:string; guest:boolean; origin:string;
}){
  const key=process.env.RESEND_API_KEY;
  if(!key)throw new Error("RESEND_API_KEY not configured");
  const destination=input.guest
    ? `${input.origin}/login?next=${encodeURIComponent("/inner-circle/member")}&claim=marketplace`
    : `${input.origin}/inner-circle/member`;
  const text=[
    "GENCOUV INNER CIRCLE — PAYMENT CONFIRMED",
    "",
    "Your $1,000 annual research membership payment has been verified.",
    "Access your members-only Robotics 20 educational watchlist after signing in with your checkout email:",
    destination,
    "",
    "Private Telegram access is provided separately after member verification. Do not assume a Telegram invitation is active until you receive a confirmed invite.",
    "The research watchlist is educational and is not a personalized recommendation or a promise of returns.",
    "Stocks, cryptocurrencies, metals and leveraged CFDs may lead to losses. ",
    "",
    "Order reference: "+input.orderId,
    "Questions: https://t.me/gencouv",
  ].join("\n");
  const response=await fetch("https://api.resend.com/emails",{
    method:"POST",
    headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},
    body:JSON.stringify({from:"Gencouv Capital <research@gencouv.com>",to:[input.email],subject:"Your Gencouv Inner Circle access",text}),
    cache:"no-store"
  });
  if(!response.ok)throw new Error(`Inner Circle fulfillment email failed (${response.status})`);
}
