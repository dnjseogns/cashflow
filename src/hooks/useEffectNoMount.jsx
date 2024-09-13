import { useEffect, useRef } from "react";

const useEffectNoMount = (func, arr) => {
    const isFirst = useRef(true);
    useEffect(()=>{
        if(isFirst.current){
            isFirst.current = false;
            return;
        }
        func();
    },arr)
}
export default useEffectNoMount;