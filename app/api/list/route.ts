import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
export const GET =async (req: Request) => {
  let obj = {url:'https://search.shopping.naver.com/',product:'product/',id:85946879754,gate:'gate.nhn?'}  
  let text = `${obj.url}${obj.gate}${obj.id}`
  console.log(text)
  let text2 = 'https://openapi.naver.com/v1/search/book.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1'
  fetch(text, { method: "GET" }).then(async (res) => {
     
     return res.json()
 
  }).then((data)=>{
    console.log('data-------------------------------',data)
  }); 
  fetch(text2, { method: "GET" }).then(async (res) => {
     
    return res.json()

 }).then((data)=>{
   console.log('data2-------------------------------',data)
 }); 
  const greeting = await get("name");  
  return NextResponse.json({ message: greeting, status: 200, errMsg: "" });
};

export const POST = (req: Request, res: Response) => {
  return NextResponse.json({ message: "greeting", status: 200, errMsg: "" });
};
