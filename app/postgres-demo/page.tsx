"use client";

import { NextResponse } from "next/server";
import { useState,useEffect,useRef } from "react";

import { sql } from "@vercel/postgres";
import useCountDown from "@/components/useCountDown";
import useTime from "@/components/useTime";


// 你的代码
function getData(obj:any,key:string){
  let arr = key.split('.')
  console.log('arr',arr)
  let b = obj;
  
 arr.map((i)=>{
  if(b.hasOwnProperty(i)){
    b=b[i]
  }else{
    b = undefined
  }
 
 })
    
 
  return b
}



// 测试代码，请勿修改
const data = {
  a: {
    aa: {
      aaa: 'raaa'
    }
  },
  b: [{}, {}, {bb: 'rbb'}]
}
let data2= getData(data,'a.bb')
console.log(data2)
const  About =  ()=> {
  const [dt,setDt] = useState('')
  const [list,setList] = useState(10)
  useEffect(() => {    
      // fetch(`/api/list`, { method: "GET" }).then(async (res) => {
      //   const rows  = await sql`SELECT * FROM TodoList`;
      //   setList(rows)
      //   const data = (await res.json()) 
      //   setDt(data.message)
     
      // });
     
     
  },[]);
  

  const [time,setTime] = useCountDown({time:10,func:()=>{console.log()}})
  const [t,setT] = useTime({time:10,func:()=>{console.log()}})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border-indigo-600 h-8 hover:h-full">
        {/* About is {dt}  */}
       
        {t}
      </div>
      <div>
        {/* {Object.keys(list)} */}
       {time}
      </div>
    </main>
  );
}



export default About;
