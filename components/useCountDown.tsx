import { useEffect, useRef, useState } from "react";

interface IProps {
  time: number;
  func: () => void;
}

const useCountDown = (props:IProps) => {
 
 
  const {time,func} = props
  const [conut,setCount] = useState(time|0)
  useEffect(() => {
    console.log('useCountdown2：创建定时器');
    const time = setInterval(() => {
      setCount((preCount) => {
        if (preCount === 0) {
          console.log('useCountdown2：销毁定时器');
          clearInterval(time);
          return 0;
        }
        return preCount - 1;
      });
    }, 1000);
    return () => {
      console.log('useCountdown2：销毁定时器');
      clearInterval(time);
    };
  }, []);

  

  return [conut];
};

export default useCountDown;


