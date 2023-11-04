"use client"

import { sql } from "@vercel/postgres";
export interface IBaseTemplate {
  sampleTextProp: string;
}
const Btn: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {

  const handlerClick = ()=>{
    let txt =111
    console.log(txt)
    // let params = {
    //   userId:'userId'+Math.floor(Math.random() * 101),
    //   content:'content'+Math.floor(Math.random() * 101)
    // }
    // sql`INSERT INTO TodoList (content, userId) VALUES (${params.userId}, ${params.content});`;
  }
  return (
    <div>
      <button onClick={handlerClick} className="text-sm lg:flex border border-indigo-600 h-16 items-center">{sampleTextProp}随机添加一条数据</button>
    </div>
  );
};

export default Btn;
