import { game } from "../../data/gameData.js";
import { advanceYear } from "./year.js";
import { shuffleArr } from "../funcs.js";
import { eventsData } from "../../data/eventsData.js";

export function advanceMonth(){
    shuffleArr(eventsData);
    
    resetPopDeaths();
    
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
    }  
    else if(game.season == "winter"){
        game.season = "spring";

        document.getElementById("map").classList.remove("map-winter");
        advanceYear();
    }
}

function resetPopDeaths(){
    for(const m in game.popDeaths){
        game.popDeaths[m] = 0;
    }
}