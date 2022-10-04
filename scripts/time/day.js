import { game } from "../gameData.js";
import { advanceMonth } from "./month.js";

export function advanceDay(){
    game.totalDays++;
    if(game.day < game.seasonLength){
        game.day++;
    }
    else{
        game.day = 1;
        advanceMonth();
    }
}