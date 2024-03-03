import { NextResponse } from "next/server";
import { EdgeConfigValue, get } from "@vercel/edge-config";

async function middleware() {
  const greeting = await get("greeting");
  const greeting2 = await get("name");
  return [greeting,greeting2];  
  // return NextResponse.json(
  //   { message: "Hello from middleware!" },
  //   { status: 200 }
  // );
}

async function About() {
  let list:any;
  list = await middleware();
  console.log("-------------------");
  console.log(new Date());
  console.log(list);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     {list.map((item:string)=>{
      return <div key={item} >{item}</div>
     })}
  
    </main>
  );
}

export default About;
