import { rand } from "./funcs.js";
import { game } from "../data/gameData.js"
import { pauseGame, playGame } from "./gameTime.js";

import { eventsData } from "../data/eventsData.js";

export function events(){
    newEvents();
    runEvents();
    updateModifiers();
}

function newEvents(){
    for(const e in eventsData){
        const evt = eventsData[e];

        if(rand(0,evt.rareness) == 0){
            if(evt.hasOwnProperty("modifier") && game.modifiers[e]) continue;
            if(evt.hasOwnProperty("condition") && !evt.condition()) continue;

            evt.onTrigger();

            pauseGame(); 

            Swal.fire({
                title: evt.title,
                html: evt.message,
                imageUrl: "../img/events/"+e+".webp",
                imageHeight: 200,
                allowOutsideClick: false,
            }).then(() => {
                playGame();
            });

            if(evt.hasOwnProperty("modifier")){
                game.modifiers[e] = {
                    end: evt.duration,
                    effect: evt.modifier,
                };
            }

            break; //Only one event per day
        }
    }
}

function runEvents(){
    for(const e in game.activeEvents){
        const evt = game.activeEvents[e];

        evt.update();
    }
}

function updateModifiers(){
    for(const m in game.modifiers){
        const mod = game.modifiers[m];
        console.log(game.modifiers[m]);
        
        try{
            game.modifiers[m].effect();
        }catch(error){}

        mod.end--;
        if(mod.end == 0){
            delete game.modifiers[m];
        }
    }
}