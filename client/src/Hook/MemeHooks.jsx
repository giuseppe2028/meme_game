import {useState} from "react";

export function nextMemeState(){
    const [indexMeme, setIndexMeme] = useState(0);
    const nextMeme = ()=> setIndexMeme(indexMeme+1)

    return [indexMeme,nextMeme]
}