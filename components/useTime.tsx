import { useEffect, useRef, useState } from "react";

interface IProps {
  time: number;
  func: () => void;
}

const useTime = (props:IProps) => {
 
 
  const {time,func} = props
  const [list,setList] = useState(time|0)
  useEffect(() => {    
    
      setTimeout(()=>{
        setList(x=>x-1)
      },1000)
      
   
  },[Math.max(list,1)]);
  

  return [list];
};

export default useTime;


