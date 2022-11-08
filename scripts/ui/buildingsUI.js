import { buildingsData } from "../../data/buildingsData.js";
import { game } from "../../data/gameData.js";

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

export function buildingsBootstrap(){
    buildingsData.forEach(element => {
        const count = document.querySelectorAll("map-"+element.id).length;

        if(game[element.id] > count){
            for(let i = 0; i < game[element.id]-count; i++){
                buildingHTML(element.id);
            }
        }
    });
}

export function destroyBuilding(id, qty){
    const elements = document.querySelectorAll(".map-"+id);

    if(qty > elements.length) qty = elements.length;

    for(let i = 0; i < qty; i++){
        elements[i].remove();
    }
}

const buildings = [
    ["house",
        ["house","stoneHouse"]],
    ["farm",
        ["cropField"/*,"orchard"*/]],
    ["pasture", 
        ["farm"]],
    ["resources", 
        ["lumbermill","mine","quarry"]],
    ["manufacture", 
        ["sawmill"]],
    ["businesses", 
        ["tavern"]],
    ["handicraft", 
        ["tailorsmith","foundry"]],
    /*
    ["scriptoriums", 
        ["school"]],
    */
    ["others", 
        ["warehouse"]],
];

function getBuildingName(element){
    for(let i = 0; i < buildingsData.length; i++) {
        const b = buildingsData[i];

        if(b.id == element)
            return b.name;
    }
}

let selectedBuildingMenuType = "";
function hideAllBuildingBtns(){
    for(let i = 0; i < buildings.length; i++){
        const building = buildings[i];

        document.getElementById("building-"+building[0]).classList.remove("btn-active");

        for(let j = 0; j < building[1].length; j++){
            const element = building[1][j];
            document.getElementById("add-"+element).classList.add("hidden");
        }
    }
}


export function buildinglisteners(){
    for(let i = 0; i < buildings.length; i++){
        const building = buildings[i];

        for(let j = 0; j < building[1].length; j++){
            const element = building[1][j];
            const name = getBuildingName(element);

            document.getElementById("buildings-menu2").innerHTML += `
                <button class="btn building-menu hidden" id="add-${element}">${name}</button>
            `;
        }
        
        document.getElementById("building-"+building[0]).addEventListener("click",()=>{
            if(selectedBuildingMenuType != building[0]){
                hideAllBuildingBtns();
                selectedBuildingMenuType = building[0];   
            }

            document.getElementById("building-"+building[0]).classList.add("btn-active");

            building[1].forEach(e => {
                document.getElementById("add-"+e).classList.remove("hidden");
            });
        });
    }
/*
    if(selectedBuildingMenuType != building[0]){
        for(let i = 0; i < buildings.length; i++){
            const building = buildings[i];
            for(let j = 0; j < building[1].length; j++){
                console.log(building[1][j])
                if(document.getElementById("add-"+building[1][j]))
                    document.getElementById("add-"+building[1][j]).classList.add("hidden");
            }
        }
        
    }
    */
    document.getElementById("buildings-menu").addEventListener("click",()=>{
        ;
    });
}
    