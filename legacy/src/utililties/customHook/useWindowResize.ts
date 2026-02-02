import { useEffect } from "react";

const useWindowResize = (callback: ()=>void) => {
    useEffect(()=>{
        const handleResize = ()=> {
            callback();
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    })
}

export default useWindowResize;