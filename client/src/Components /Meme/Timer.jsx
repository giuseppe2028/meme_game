import { useEffect, useState } from "react";
import {ProgressBar} from "react-bootstrap";

export function Timer(props){
    const [time, setTime] = useState(30);

    useEffect(() => {
        console.log(props.memeElement)
        if (props.running && time > 0) {
            const timerId = setTimeout(() => {
                setTime(time - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        } else if(time === 0){

            props.updateResponse(props.indexMeme,"None",0)
            props.setShowTimeoutToast(true)
            props.setButtonDisable(true)
        }
    }, [time,props.running]);

    useEffect(() => {
        setTime(30)
        props.setRunning(true)
    }, [props.memeElement]);


    return (
        <>
        <h1>{time}</h1>
            <ProgressBar variant="warning" animated max={30} now={time} min={0}/>
        </>
    );
}
