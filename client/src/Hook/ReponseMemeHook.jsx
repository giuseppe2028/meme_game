import {useContext, useState} from "react";
import UserContext from "../Context/userContext.js";
import {CustomRespone} from "../Models/Response.js";

export function responseMemeHook(){
    const { usernameContext } = useContext(UserContext);
    const [response, setResponse] = useState(usernameContext === "Guest" ?  [new CustomRespone("None",0)] :[new CustomRespone("None",0),new CustomRespone("None",0),new CustomRespone("None",0)] )
    const updateResponse = (index,response,score)=>{
        setResponse(prevResponses => {
            const newResponses = [...prevResponses];
            console.log("risposta nuova:")
            console.log(newResponses)
            console.log("con indice")
            console.log(index)
            newResponses[index] = new CustomRespone(response,score);
            return newResponses;
        });
    }
    return [response,updateResponse]




}