import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";
import {useState} from "react";
async function middleware() {
  const greeting = await get("name");
  return greeting
  //return NextResponse.json({ message: greeting, status: 200 });
}

async function About( props:any ) {
  // const [dt,setDt] = useState(0)
  
  const posts =await getHello()
  const gree = await middleware()
  console.log('posts')
  console.log(posts)
  console.log(gree)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border-indigo-600 h-8 hover:h-full">
        About is {posts?.message} {gree}
      </div>
    </main>
  );
}

const getHello = async () => {
    const res = await fetch(`http://localhost:3000/api/list`)
    return res.json()
}

// export async function getPosts() {
//   const res = await fetch(`/api/list`)
//   const posts = await res.json()
//   console.log(posts)
//   return {
//     props: { posts },
//     revalidate: 60,
//   }
// }

export default About;
