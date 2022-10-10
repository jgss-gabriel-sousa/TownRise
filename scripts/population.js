import { children } from "./population/children.js";
import { idle } from "./population/idle.js";

import { game } from "./gameData.js";

export function PopulationUpdate(){
    let difficulty;

    if(game.gameDifficulty == "hard")       difficulty = 1;
    if(game.gameDifficulty == "normal")     difficulty = 0.75;
    if(game.gameDifficulty == "easy")       difficulty = 0.5;
    
    children(difficulty);
    idle(difficulty);

    game.hungry = 0;

    if(game.grain+game.grain_balance < 0){
        game.grain_lack = true;    
        game.hungry += 0.22;
    }
    else{
        game.grain_lack = false;    
        game.hungry -= 0.22;
    }
    if(game.fruit+game.fruit_balance < 0){
        game.fruit_lack = true;    
        game.hungry += 0.18;
    }
    else{
        game.fruit_lack = false;    
        game.hungry -= 0.18;
    }
    if(game.meat+game.meat_balance < 0){
        game.meat_lack = true;     
        game.hungry += 0.60;
    }
    else{
        game.meat_lack = false;    
        game.hungry -= 0.60;
    }
}