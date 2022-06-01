import { rand } from "./funcs.js";

export function buildingHTML(id){
    const houses = document.getElementById("map-houses");
    const farms = document.getElementById("map-farms");
    const other = document.getElementById("map-other");


    if(id == "house"){
        const variation = rand(0,1);
        if(variation == 0)  houses.innerHTML += '<div class="map-item map-item-md map-house"><img src="./img/house0.gif"></div>';
    }
    else if(id == "farm"){
        const variation = rand(0,1);
        if(variation == 0)  farms.innerHTML += '<div class="map-item map-item-sm map-farm"><img src="./img/farm.gif"></div>';
        //if(variation == 1)  farms.innerHTML += '<div class="map-item map-item-sm"><img src="./img/farm.gif"></div>';
    }
    else if(id == "warehouse"){
        other.innerHTML += '<div class="map-item map-item-md map-warehouse"><img src="./img/warehouse.gif"></div>';
    }
    else if(id == "lumbermill"){
        other.innerHTML += '<div class="map-item map-item-md map-lumbermill"><img src="./img/lumbermill.gif"></div>';
    }
    else if(id == "quarry"){
        other.innerHTML += '<div class="map-item map-item-lg map-quarry"><img src="./img/quarry.gif"></div>';
    }
    else if(id == "mine"){
        other.innerHTML += '<div class="map-item map-item-lg map-mine"><img src="./img/mine.gif"></div>';
    }
    else if(id == "builder"){
        other.innerHTML += '<div class="map-item map-item-md map-builder"><img src="./img/builder.gif"></div>';
    }
    else{
        return false;
    }

    return true;
}

export function destroyBuildingHTML(id, qty){
    const elements = document.querySelectorAll(".map-"+id);

    if(qty > elements.length) qty = elements.length;

    for(let i = 0; i < qty; i++){
        elements[i].remove();
    }
}

export function qtyToDestroy(resource, consumption, buildings){
    return Math.round(-((resource*(consumption/buildings))-consumption));
}