import "server-only";

const EVENT_NAME = "gencouv.marketplace.purchase.fulfilled";

export async function sendMarketplaceFulfilledEmail(input:{
  email:string;
  productName:string;
  licenseName:string;
  orderId:string;
  guest:boolean;
  origin:string;
}){
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  const accountUrl=input.guest
    ? `${input.origin}/login?next=${encodeURIComponent("/dashboard#library")}&claim=marketplace`
    : `${input.origin}/dashboard#library`;

  const response=await fetch("https://api.resend.com/events/send",{
    method:"POST",
    headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},
    body:JSON.stringify({
      event:EVENT_NAME,
      email:input.email,
      payload:{
        product_name:input.productName,
        license_name:input.licenseName,
        order_id:input.orderId,
        account_url:accountUrl,
        guest:input.guest
      }
    }),
    cache:"no-store"
  });

  if(!response.ok){
    const body=await response.text().catch(()=>"");
    throw new Error(`Resend marketplace event failed (${response.status}): ${body.slice(0,300)}`);
  }
}
