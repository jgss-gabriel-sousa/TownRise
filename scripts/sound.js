import { rand } from "./funcs.js"

var audio = new Audio();
const NUMBER_OF_SONGS = 7;

export function soundStart(){
    if(!localStorage.getItem("mv-volume"))
        localStorage.setItem("mv-volume", "0.2");
}

export function soundtrack(){
    if(audio.paused){
        const newSongID = rand(0,NUMBER_OF_SONGS);
        audio = new Audio("./songs/"+newSongID+".mp3");
        
        const tryToPlay = setInterval(() => {        
            audio.play()
                .then(() => {
                    clearInterval(tryToPlay);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 1000);
    }

    audio.volume = Number(localStorage.getItem("mv-volume"))/4;
    
    window.setTimeout(soundtrack, 500);
}

