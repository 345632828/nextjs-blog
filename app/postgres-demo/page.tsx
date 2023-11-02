"use client";

import { NextResponse } from "next/server";
import { useState,useEffect } from "react";
const  About =  ()=> {
  const [dt,setDt] = useState('')
  useEffect(() => {    
      fetch(`/api/list`, { method: "GET" }).then(async (res) => {
        const data = (await res.json()) 
        setDt(data.message)
     
      });
  }, []);
  
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border-indigo-600 h-8 hover:h-full">
        About is {dt} 
      </div>
    </main>
  );
}

const getHello = async () => {
  const res = await fetch(`/api/list`, {
    method: "GET",
  });
  return res.json();
};

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
