import { game } from "../data/gameData.js";
import { updateDataInfo } from "./ui/ui.js";
import { buildingHTML, destroyBuilding } from "./ui/buildingsUI.js";

import { jobs } from "./jobs.js";

import { house } from "./buildings/house.js";
import { stoneHouse } from "./buildings/stoneHouse.js";
import { school } from "./buildings/school.js";
import { cropField } from "./buildings/cropField.js";
import { farm } from "./buildings/farm.js";
import { tailorsmith } from "./buildings/tailorsmith.js";
import { foundry } from "./buildings/foundry.js";
import { lumbermill } from "./buildings/lumbermill.js";
import { sawmill } from "./buildings/sawmill.js";
import { warehouse } from "./buildings/warehouse.js";
import { quarry } from "./buildings/quarry.js";
import { mine } from "./buildings/mine.js";
import { tavern } from "./buildings/tavern.js";

export function buildingsUpdate(){
    jobs();

    house();
    stoneHouse();
    school();
    cropField();
    farm();
    tailorsmith();
    foundry();
    lumbermill();
    sawmill();
    warehouse();
    quarry();
    mine();
    tavern();
}

export async function buildBuilding(buildingID){
    if(!game.gameStarted) return;
    if(game.gamePaused) return;

    if(buildingID == "house"){
        if(game.wood >= 4 && game.stone >= 2){
            game.house++;
            game.wood -= 4;
            game.stone -= 2;
        }
        else return;
    }
    else if(buildingID == "stoneHouse"){
        if(game.wood >= 6 && game.stone >= 10 && game.iron >= 2){
            game.stoneHouse++;
            game.wood -= 6;
            game.stone -= 10;
            game.iron -= 2;

            if(game.house > 0){
                game.house--;
                destroyBuilding("house",1);
            }
        }
        else return;
    }
    else if(buildingID == "school"){
        if(game.wood >= 12 && game.stone >= 4 && game.iron >= 4){
            game.school++;
            game.wood -= 12;
            game.stone -= 4;
            game.iron -= 4;
        }
        else return;
    }
    else if(buildingID == "cropField"){
        game.cropField++;
    }
    else if(buildingID == "farm"){
        game.farm++;
    }
    else if(buildingID == "tailorsmith"){
        if(game.wood >= 10){
            game.tailorsmith++;
            game.wood -= 10;
        }
        else return;
    }
    else if(buildingID == "foundry"){
        if(game.stone >= 10){
            game.foundry++;
            game.stone -= 10;
        }
        else return;
    }
    else if(buildingID == "lumbermill"){
        game.lumbermill++;
    }
    else if(buildingID == "sawmill"){
        if(game.wood >= 20 && game.stone >= 10){
            game.sawmill++;
            game.wood -= 20;
            game.stone -= 10;
        }
        else return;
    }
    else if(buildingID == "warehouse"){
        if(game.wood >= 50){
            game.warehouse++;
            game.wood -= 50;
        }
        else return;
    }
    else if(buildingID == "quarry"){
        if(game.wood >= 30){
            game.quarry++;
            game.wood -= 30;
        }
        else return;
    }
    else if(buildingID == "mine"){
        if(game.stone >= 30){
            game.mine++;
            game.stone -= 30;
        }
        else return;
    }
    else if(buildingID == "tavern"){
        if(game.wood >= 12 && game.stone >= 6 && game.iron >= 4){
            game.tavern++;
            game.wood -= 12;
            game.stone -= 3;
            game.iron -= 5;
        }
        else return;
    }
    else{
        return;
    }

    buildingHTML(buildingID);
    updateDataInfo();
}