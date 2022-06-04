import { game } from "./gameData.js";
import { updateDataInfo } from "./ui.js";
import { buildingsData } from "./buildingsData.js";

import { house } from "./buildings/house.js";
import { school } from "./buildings/school.js";
import { cropField } from "./buildings/cropField.js";
import { farm } from "./buildings/farm.js";
import { tailor } from "./buildings/tailor.js";
import { blacksmith } from "./buildings/blacksmith.js";
import { lumbermill } from "./buildings/lumbermill.js";
import { sawmill } from "./buildings/sawmill.js";
import { warehouse } from "./buildings/warehouse.js";
import { quarry } from "./buildings/quarry.js";
import { mine } from "./buildings/mine.js";


export function buildingHTML(id){
    const city = document.getElementById("map-city");
    const farms = document.getElementById("map-farms");
    const manufactories = document.getElementById("map-manufactories");

    let exists = false;

    buildingsData.forEach(element => {
        if(element.id == id){
            exists = true;

            let buildingHTML = `<div class="map-item map-item-${element.spriteSize} map-${element.spritePlace} map-${element.id}">
                                    <img src="./img/${element.id}.png">
                                </div>`;

            if(element.spritePlace == "city")           city.innerHTML += buildingHTML;
            if(element.spritePlace == "farms")          farms.innerHTML += buildingHTML;
            if(element.spritePlace == "manufactories")  manufactories.innerHTML += buildingHTML;
        }
    });

    if(exists)
        return true;
    else
        return false;
}

export function destroy(id, qty){
    const elements = document.querySelectorAll(".map-"+id);

    if(qty > elements.length) qty = elements.length;

    for(let i = 0; i < qty; i++){
        elements[i].remove();
    }
}

export function buildingsUpdate(){
    house();
    school();
    cropField();
    farm();
    tailor();
    blacksmith();
    lumbermill();
    sawmill();
    warehouse();
    quarry();
    mine();
}

export function build(buildingID){
    if(!game.gameStarted) return;
    if(game.gamePaused) return;

    if(buildingID == "house"){
        if(game.wood >= 5 && game.stone >= 2){
            game.house++;
            game.wood -= 5;
            game.stone -= 2;
        }
        else return;
    }
    else if(buildingID == "school"){
        if(game.wood >= 40 && game.stone >= 20 && game.iron >= 20){
            game.school++;
            game.wood -= 40;
            game.stone -= 20;
            game.iron -= 20;
        }
        else return;
    }
    else if(buildingID == "cropField"){
        if(game.season != "winter"){
            game.cropField++;
        }
        else return;
    }
    else if(buildingID == "farm"){
        if(game.wood >= 10){
            game.farm++;
            game.wood -= 10;
        }
        else return;
    }
    else if(buildingID == "tailor"){
        if(game.wood >= 10){
            game.tailor++;
            game.wood -= 10;
        }
        else return;
    }
    else if(buildingID == "blacksmith"){
        if(game.stone >= 10){
            game.blacksmith++;
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
        if(game.wood >= 40){
            game.quarry++;
            game.wood -= 40;
        }
        else return;
    }
    else if(buildingID == "mine"){
        if(game.stone >= 40){
            game.mine++;
            game.stone -= 40;
        }
        else return;
    }
    else{
        return;
    }

    buildingHTML(buildingID);
    updateDataInfo();
}