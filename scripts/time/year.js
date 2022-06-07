import { game } from "../gameData.js";
import { logPush } from "../log.js";

export function advanceYear(){
    if(game.childrens > 1 && game.childrens < 4){
        game.childrens--;
        game.population++;

        if(game.educated < (game.school*4))
            game.educated++;

        logPush("1 criança se tornou adulta");
    }
    else if(game.childrens > 0){
        const newPops = game.childrens;
        game.childrens -= newPops;
        game.population += newPops;

        let newEducated;
        if(game.educated+game.school < game.educatedLimit)
            newEducated = game.school;
        else if(game.educated < game.educatedLimit){
            newEducated = game.educatedLimit-game.educated;
        }

        game.educated = newEducated;

        if(newEducated > 1)
            logPush(newEducated+" pessoas se tornaram alfabetizadas");
        if(newEducated > 1)
            logPush(newEducated+" pessoas se tornaram alfabetizadas");


        if(game.educated > game.educatedLimit )   game.educated = game.educatedLimit;

        if(newPops > 0)
            logPush(newPops+" crianças se tornaram adultas");
    }
}