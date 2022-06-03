import { game } from "./gameData.js";
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

export function destroyBuildingHTML(id, qty){
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