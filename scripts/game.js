import { rand, highScoreHTML, checkHighScore, shuffleArr } from "./funcs.js";
import { soundStart, soundtrack } from "./sound.js";
import { resourcesUI,professionsUI } from "./ui/ui.js";
import { savedGamesHTML } from "./ui/load-saveUI.js";
import { newWeather } from "./weather.js";
import { advanceDay } from "./time/day.js";
import { popUpdate } from "./ui/popUI.js";
import { game } from "../data/gameData.js";
import { gameTick } from "./gameTick.js";
import { eventsData } from "../data/eventsData.js";
import { resources } from "../data/resourcesData.js";
import { buildingsData } from "../data/buildingsData.js";
import { popsData } from "../data/popsData.js";

function gameBootstrap(){
    for(const k in buildingsData){
        game[k] = 0;
    }
    for(const k in resources){
        game[k] = 0;
        game[k+"_balance"] = 0;
        game[k+"_lack"] = 0;
    }
    for(const k in popsData){
        game[k] = 0;
        game[k+"_jobs"] = 0;
    }

    game.fruit = 50;
    game.fruit = 50;
    game.wood = 20;
    game.firewood = 20;
    game.stone = 10;
    game.clothes = 50;
    game.tools = 50;
    game.ale = 10;

    game.idle = 10;
}gameBootstrap();

export function checkGameOver(){
    if(!game.population || game.gameOver){
        game.gameOver = true;

        checkHighScore(game.score);

        if(game.gameSurrender)
            document.location.reload(true);
        else{
            Swal.fire({
                title: "Sua vila acabou :(",
                text: "Pontuação: "+game.score,
            });
        }

        document.getElementById("options").classList.add("hidden");
        document.getElementById("restart").classList.remove("hidden");
        document.getElementById("pause").classList.add("hidden");
        document.getElementById("1x").classList.add("hidden");
        document.getElementById("5x").classList.add("hidden");
        document.getElementById("10x").classList.add("hidden");
    }
}

export function newTurn(){
    checkGameOver();

    advanceDay();
    newWeather();
    
    gameTick();

    if(!game.gameOver && !game.gamePaused)
        game.gameTick = window.setTimeout(newTurn, game.gameSpeed);
}

window.setTimeout(soundtrack, rand(1500,5000));
soundStart();
highScoreHTML();
resourcesUI();
professionsUI();
savedGamesHTML();
shuffleArr(eventsData);

setInterval(popUpdate, 100);