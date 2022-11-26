import { game } from "../data/gameData.js";
import { logPush } from "./ui/log.js";
import { buildingsUpdate } from "./buildings.js";
import { rand, average } from "./funcs.js";
import { updateDataInfo } from "./ui/ui.js";
import { resources } from "../data/resourcesData.js";
import { populationUpdate } from "./population.js";
import { events } from "./events.js";

export function gameTick(){
    if(game.gameOver) return;

    // RESET RESOURCES BALANCES
    for(const r in resources){
        game[r+"_balance"] = 0;
        game[r+"_lack"] = false;
    }
    game.food_consumption = 0;
    game.popLimit = 10;

    buildingsUpdate();
    populationUpdate();

    scoreCalc();
    productivityCalc();
    resourcesCalc();
    happinessCalc();
    foodCalc();

    updateDataInfo();
    
    // RESET IMPACTS VARS
    for(const k in game.impacts) {
        game.impacts[k] = 1;
    }

    events();
}

function resourcesCalc(){
    for(const r in resources){
        //Add to Resource Count the Balance
        game[r] += game[r+"_balance"];

        //If Resource Count < 0 set to 0
        if(game[r] < 0){
            game[r] = 0;

            if(game[r+"_balance"] < 0)
                game[r+"_lack"] = true;
        }
    }
}

export function productivityCalc(){
    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;
    if(toolsAccess < 1) game.tools_lack = true;

    let toolsPopConsumption;
    if(game.gameDifficulty == "hard")       toolsPopConsumption = 1.5/(game.seasonLength*4); // 1.5 por Ano
    if(game.gameDifficulty == "normal")     toolsPopConsumption = 1/(game.seasonLength*4); // 1 por Ano
    if(game.gameDifficulty == "easy")       toolsPopConsumption = 0.5/(game.seasonLength*4); // 0.5 por Ano
    
    const seasonProductivity = game.season == "winter" ? 0.5 : 1;

    game.productivity = average([1,toolsAccess,seasonProductivity]);

    if(game.productivity > 1) game.productivity = 1;
    
    if(game.gameDifficulty == "normal" && game.productivity < 0.25) game.productivity = 0.25;
    if(game.gameDifficulty == "easy" && game.productivity < 0.5) game.productivity = 0.5;
}

export function happinessCalc(){
    game.happiness = average([1,(game.ale_lack==false?1:0),game.lifeQuality]);

    game.happiness *= game.impacts.happiness

    if(game.happiness > 1) game.happiness = 1;
    if(game.happiness < 0) game.happiness = 0;
}

export function foodCalc(){
    game.food = (game.grain*0.25) + (game.meat*0.15) + (game.fruit*0.1) + (game.bread*0.25) + (game.milk*0.25);
}

function scoreCalc(){
    let difficultyBonus = 1;
    if(game.gameDifficulty == "hard") difficultyBonus *= 2;
    if(game.gameDifficulty == "easy") difficultyBonus /= 10;

    game.score = Math.floor(((game.popRecord * (1+game.weapon) * game.totalDays * game.happiness)/2000)*difficultyBonus);
}