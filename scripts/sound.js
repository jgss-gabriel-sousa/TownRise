import { rand } from "./funcs.js"

var audio = new Audio();
const NUMBER_OF_SONGS = 8;

export function soundStart(){
    if(!localStorage.getItem("volume"))
        localStorage.setItem("volume", "0.5");

    document.querySelector("#volume input").value = localStorage.getItem("volume");
}

export function soundtrack(){
    if(audio.paused){
        const newSongID = rand(0,NUMBER_OF_SONGS);
        audio = new Audio("songs/"+newSongID+".mp3");
        try{
            audio.play();
        }catch(error){}
    }

    audio.volume = Number(localStorage.getItem("volume"))/4;
    
    window.setTimeout(soundtrack, 500);
}

