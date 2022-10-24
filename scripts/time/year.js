import { game } from "../gameData.js";
import { logPush } from "../ui/log.js";

export function advanceYear(){
    if(game.childrens > 1 && game.childrens < 4){
        game.childrens--;
        game.population++;

        logPush("1 criança se tornou adulta");
    }
    else if(game.childrens > 0){
        const newPops = game.childrens;
        game.childrens -= newPops;
        game.population += newPops;

        if(newPops > 0)
            logPush(newPops+" crianças se tornaram adultas");
    }
}