import { game } from "./gameData.js";
import { buildingsData } from "./buildingsData.js";

const buildings = [
    ["house",["house","stoneHouse"]],
    ["farm",["cropField"/*,"orchard"*/]],
    ["pasture", ["farm"]],
    ["handicraft", ["tailorsmith","blacksmith"]],
    ["manufacture", ["sawmill"]],
    ["resources", ["lumbermill","mine","quarry"]],
    ["businesses", ["tavern"]],
    ["scriptoriums", ["school"]],
    ["others", ["warehouse"]],
];


function getBuildingName(element){
    for(let i = 0; i < buildingsData.length; i++) {
        const b = buildingsData[i];

        if(b.id == element)
            return b.name;
    }
}

for(let i = 0; i < buildings.length; i++){
    const building = buildings[i];
    let contentHTML = `<div class="building-menu-tooltip">`;

    for(let j = 0; j < building[1].length; j++){
        const element = building[1][j];
        const name = getBuildingName(element);

        contentHTML += `<button class="btn" id="add-${element}">${name}</button>`;
    }
    contentHTML += `</div>`;


    tippy("#building-"+building[0], {
        content: contentHTML,
        maxWidth: 500,
        placement: 'right',
        trigger: 'click',
        allowHTML: true,
        interactive: true,
    });
}

setInterval(() => {
    tippy("#pop-info", {
        content: `
            <p><b>Adultos:</b> ${game.population}</p>
            <p><b>Crianças:</b> ${game.childrens}</p>
            <br>
            <p><b>Pop. Recorde:</b> ${game.popRecord}</p>
        `,
        maxWidth: 500,
        allowHTML: true,
    });
},1000);