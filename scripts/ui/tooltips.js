import { game } from "../../data/gameData.js";
import { buildingsData } from "../../data/buildingsData.js";
import { numberF } from "../funcs.js";

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

for(let i = 0; i < buildingsData.length; i++){
    const building = buildingsData[i];
    let contentHTML = "";

    for(let j = 0; j < building.build.length; j++){
        contentHTML += `<li>${building.build[j]}</li>`;
    }
    if(contentHTML == "") continue;

    tippy("#add-"+building.id, {
        content: contentHTML,
        maxWidth: 500,
        placement: 'right',
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
        <p><b>Felicidade:</b> ${Math.round((game.happiness/0.5)*100)-100}%</p>
        <p><b>Impactos no Cresc.:</b> ${numberF(Math.round(game.popGrowthImpacts*100)-100,"balance",0)}%</p>
        <br>
        <p><b>População do Ano Anterior:</b> ${game.lastYear_population}</p>
        <p><b>Crescimento:</b> ${Math.round((game.population/game.lastYear_population)*100)-100}%</p>
        <br>
        <p><b>Pop. Recorde:</b> ${game.popRecord}</p>
    `);

    const seasonProductivity = game.season == "winter" ? 0.5 : 1;
    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;
    document.querySelector("#productivity-bar")._tippy.setContent(`
        <p><b>Acesso à Ferramentas:</b> ${numberF(toolsAccess*100,"",0)}%</p>
        <p><b>Felicidade:</b> ${numberF(toolsAccess*100,"",0)}%</p>
        <p><b>Saúde:</b> ${game.health*100}%</p>
        <p><b>Estação do Ano:</b> ${seasonProductivity*100}%</p>
        <p><b>Tecnologia:</b> ${game.productivityTech*100}%</p>
    `);
},tooltipUpdateRate);