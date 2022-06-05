import { rand } from "./funcs.js";
import { game } from "./gameData.js";

export function pop(){
    for(let i = 0; i < array.length; i++){
        const element = array[i];
    }
}

export function popBootstrap(){
    for(let i = 0; i < game.population; i++){
        let sprite = `<img class="pop"`;

        const popVariation = rand(0,1);
        sprite += `src="./img/pop${popVariation}.png" >`

        document.getElementById("map").innerHTML += sprite;
    }
}