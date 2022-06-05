import { game } from "../gameData.js";

export function advanceMonth(){
    let homes = game.house+1 / Math.round(game.population/4);
    if(homes > 1) homes = 1;
    if(game.population == 0) homes = 0;

    if(!game.hungry){
        const newChildrens = Math.round(((1+(rand(0,game.fertilityRate)/100)))*Math.round(game.population/8)*homes);
        game.childrens += newChildrens;

        if(newChildrens > 1)    logPush(newChildrens+" crianças nasceram no ultimo mês");
        if(newChildrens == 1)   logPush(newChildrens+" criança nasceu no ultimo mês");
    }
}