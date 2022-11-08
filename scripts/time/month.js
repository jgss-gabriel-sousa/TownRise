import { rand } from "../funcs.js";
import { game } from "../../data/gameData.js";
import { logPush } from "../ui/log.js";
import { advanceYear } from "./year.js";
import { destroyBuilding } from "../ui/buildingsUI.js";
import { popGrowth } from "../population.js";

export function advanceMonth(){
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