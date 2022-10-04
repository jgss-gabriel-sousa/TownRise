import { game } from "./gameData.js";

import { idle } from "./population/idle.js";

export function PopulationUpdate(){
    let difficulty;

    if(game.gameDifficulty == "hard")       difficulty = 1;
    if(game.gameDifficulty == "normal")     difficulty = 0.75;
    if(game.gameDifficulty == "easy")       difficulty = 0.5;

    const baseGrainCons = 2.5 / 120;
    const baseFruitCons = 1 / 120;
    const baseMeatCons = 0.75 / 120;

    const grain_consumption = ((baseGrainCons * game.population)+((baseGrainCons/2) * game.childrens)) * difficulty;
    const fruit_consumption = ((baseFruitCons * game.population)+((baseFruitCons/2) * game.childrens)) * difficulty;
    const meat_consumption = ((baseMeatCons * game.population)+((baseMeatCons/2) * game.childrens)) * difficulty;

    if(game.grain < grain_consumption){
        game.grain_lack = true;    
        game.hungry += 0.59;
    }
    else{
        game.grain_lack = false;    
        game.hungry -= 0.59;
    }
    if(game.fruit < fruit_consumption){
        game.fruit_lack = true;    
        game.hungry += 0.24;
    }
    else{
        game.fruit_lack = false;    
        game.hungry -= 0.24;
    }
    if(game.meat < meat_consumption){
        game.meat_lack = true;     
        game.hungry += 0.18;
    }
    else{
        game.meat_lack = false;    
        game.hungry -= 0.18;
    }

    game.grain_balance -= grain_consumption;
    game.fruit_balance -= fruit_consumption;
    game.meat_balance -= meat_consumption;
}