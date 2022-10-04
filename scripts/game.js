import { rand, highScoreHTML, checkHighScore } from "./funcs.js";
import { soundStart, soundtrack } from "./sound.js";
import { buildingsUI, resourcesUI, professionsUI, savedGamesHTML } from "./ui.js";
import { newWeather } from "./weather.js";
import { advanceDay } from "./time/day.js";
import { popUpdate } from "./pop.js";
import { game } from "./gameData.js";
import { gameTick } from "./gameTick.js";

export function checkGameOver(){
    if(!game.population || game.gameOver){
        game.gameOver = true;

        let difficultyBonus = 1;

        if(game.gameDifficulty == "hard")   difficultyBonus *= 2;
        if(game.gameDifficulty == "easy")   difficultyBonus /= 10;

        game.score = Math.floor(((game.popRecord * game.totalDays)/6000)*difficultyBonus);

        checkHighScore(game.score);

        if(game.gameSurrender)
            document.location.reload(true);

        Swal.fire({
            title: "Sua vila acabou :(",
            text: "Pontuação: "+game.score,
        });
        
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

    if(!game.gameOver)
        game.gameTick = window.setTimeout(newTurn, game.gameSpeed);
}

window.setTimeout(soundtrack, rand(1500,5000));
soundStart();
highScoreHTML();
buildingsUI();
resourcesUI();
professionsUI();
savedGamesHTML();

setInterval(popUpdate, 100);