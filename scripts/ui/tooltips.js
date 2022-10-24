import { game } from "../gameData.js";
import { buildingsData } from "../buildingsData.js";
import { numberFormatted } from "../funcs.js";

const tooltipUpdateRate = 500;

const buildings = [
    ["house",["house","stoneHouse"]],
    ["farm",["cropField"/*,"orchard"*/]],
    ["pasture", ["farm"]],
    ["handicraft", ["tailorsmith","foundry"]],
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
        placement: 'top',
        trigger: 'click',
        allowHTML: true,
        interactive: true,
    });
}

tippy("#pop-info", {
    maxWidth: 500,
    allowHTML: true,
});

tippy("#productivity-bar", {
    maxWidth: 500,
    allowHTML: true,
});

setInterval(() => {
    document.querySelector("#pop-info")._tippy.setContent(`
        <p><b>Adultos:</b> ${game.population}</p>
        <p><b>Crianças:</b> ${game.childrens}</p>
        <br>
        <p><b>Pop. Recorde:</b> ${game.popRecord}</p>
    `);

    const seasonProductivity = game.season == "winter" ? 0.5 : 1;
    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;
    document.querySelector("#productivity-bar")._tippy.setContent(`
        <p><b>Acesso à Ferramentas:</b> ${numberFormatted(toolsAccess)*100}%</p>
        <p><b>Felicidade:</b> ${game.happiness*100}%</p>
        <p><b>Saúde:</b> ${game.health*100}%</p>
        <p><b>Estação do Ano:</b> ${seasonProductivity*100}%</p>
    `);
},tooltipUpdateRate);