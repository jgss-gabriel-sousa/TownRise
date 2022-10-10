import { rand } from "../funcs.js";
import { game } from "../gameData.js";
import { logPush } from "../log.js";
import { advanceYear } from "./year.js";
import { destroyBuilding } from "../buildings.js";

export function advanceMonth(){
    let homes = (game.house+game.stoneHouse) / Math.round(game.population/4);
    if(homes > 1) homes = 1;
    if(game.population == 0) homes = 0;

    const newChildrens = Math.round(((1+(rand(0,game.fertilityRate)/100)))*Math.round(game.population/8)*homes);
    game.childrens += newChildrens;

    if(newChildrens > 1)    logPush(newChildrens+" crianças nasceram no ultimo mês");
    if(newChildrens == 1)   logPush(newChildrens+" criança nasceu no ultimo mês");

    
    if(game.season == "spring"){
        game.season = "summer";

        document.getElementById("map").classList.add("map-summer");
    }
    else if(game.season == "summer"){
        game.season = "autumn";

        document.getElementById("map").classList.remove("map-summer");
        document.getElementById("map").classList.add("map-autumn");
    }  
    else if(game.season == "autumn"){
        game.season = "winter";

        document.getElementById("map").classList.remove("map-autumn");
        document.getElementById("map").classList.add("map-winter");
        
        destroyBuilding("cropField",game.cropField);
        game.cropField = 0;
    }  
    else if(game.season == "winter"){
        game.season = "spring";

        document.getElementById("map").classList.remove("map-winter");
        advanceYear();
    }
}