"use client";

import { NextResponse } from "next/server";
import { useState,useEffect } from "react";
import { sql } from "@vercel/postgres";
const  About =  ()=> {
  const [dt,setDt] = useState('')
  const [list,setList] = useState({})
  useEffect(() => {    
      fetch(`/api/list`, { method: "GET" }).then(async (res) => {
        const rows  = await sql`SELECT * FROM TodoList`;
        setList(rows)
        const data = (await res.json()) 
        setDt(data.message)
     
      });
  }, []);
  
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border-indigo-600 h-8 hover:h-full">
        About is {dt} 
      </div>
      <div>
        {Object.keys(list)}
      </div>
    </main>
  );
}



export default About;
