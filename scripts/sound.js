import { rand } from "./funcs.js"

export let audio = new Audio();
const NUMBER_OF_SONGS = 7;

export function soundStart(){
    window.setTimeout(soundtrack, rand(1500, 5000));

    if(!localStorage.getItem("mv-volume"))
        localStorage.setItem("mv-volume", "0.5");
}

function soundtrack(){
    if(audio.paused){
        const newSongID = rand(0,NUMBER_OF_SONGS);
        audio = new Audio("./songs/"+newSongID+".mp3");
        audio.volume = Number(localStorage.getItem("mv-volume"))/4;
        
        const tryToPlay = setInterval(() => {        
            audio.play()
            .then(() => {
                clearInterval(tryToPlay);
            })
            .catch(error => {
                console.error(error);
            });

            audio.addEventListener('ended', setTimeout(soundtrack, rand(500,4000)));

        }, 1000);
    }
}

