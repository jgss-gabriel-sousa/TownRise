import { rand, redrawHTML } from "./funcs.js";
import { game } from "./gameData.js";

export function popUpdate(){
    if(game.gamePaused) return;
    if(!game.gameStarted) return;

    const popCount = document.querySelectorAll(".pop").length;

    if(game.population > popCount){
        const diff = game.population-popCount;

        for(let i = 0; i < diff; i++) {
            addPop();
        }
    }
    if(game.population < popCount){
        const diff = popCount-game.population;

        for(let i = 0; i < diff; i++) {
            removePop();
        }
    }
}

export function popBootstrap(){
    for(let i = 0; i < game.population; i++){
        addPop();
    }
}

function addPop(){
    let sprite = `<img class="pop"`;

    const popVariation = rand(0,2);
    sprite += `src="./img/pop${popVariation}.png" >`

    document.getElementById("pops").innerHTML += sprite;
}

function removePop(){
    const id = rand(0,document.querySelectorAll(".pop").length);

    document.querySelectorAll(".pop")[id].remove();
}