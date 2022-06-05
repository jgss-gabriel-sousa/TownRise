import { rand, highScoreHTML, checkHighScore } from "./funcs.js";
import { soundtrack } from "./sound.js";
import { buildingsUI, resourcesUI } from "./ui.js";
import { newWeather } from "./weather.js";
import { advanceDay } from "./time/day.js";
import { game } from "./gameData.js";

function checkGameOver(){
    if(!game.population){
        game.gameOver = true;

        game.score = Math.round((game.popRecord * game.totalDays)/1000);

        alert("Game Over \n\nScore: "+game.score);

        checkHighScore(game.score);

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

    if(!game.gameOver)
        game.gameTick = window.setTimeout(newTurn, game.gameSpeed);
}

window.setTimeout(soundtrack, rand(1500,5000));
highScoreHTML();
buildingsUI();
resourcesUI();