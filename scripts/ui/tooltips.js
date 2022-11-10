import { game } from "../../data/gameData.js";
import { buildingsData } from "../../data/buildingsData.js";
import { numberF } from "../funcs.js";

const tooltipUpdateRate = 500;
const tooltipMaxWidth = 500;

for(let i = 0; i < buildingsData.length; i++){
    const building = buildingsData[i];
    let contentHTML = "";

    for(let j = 0; j < building.build.length; j++){
        contentHTML += `<li>${building.build[j]}</li>`;
    }
    if(contentHTML == "") continue;

    tippy("#add-"+building.id, {
        content: contentHTML,
        maxWidth: tooltipMaxWidth,
        placement: 'right',
        allowHTML: true,
        interactive: true,
    });
}

const tippyElements = ["pop-info","productivity-info","happiness-info","food-info"];
tippyElements.forEach(e => {
    tippy("#"+e, {
        maxWidth: tooltipMaxWidth,
        allowHTML: true,
    });
});

setInterval(() => {
    document.querySelector("#pop-info")._tippy.setContent(`
        <p><b>População Abrigada:</b> ${Math.round(game.sheltered/game.population)*100}%</p>

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
    document.querySelector("#productivity-info")._tippy.setContent(`
        <p><b>Acesso à Ferramentas:</b> ${numberF(toolsAccess*100,"",0)}%</p>
        <p><b>Felicidade:</b> ${numberF(game.happiness*100,"",0)}%</p>
        <p><b>Saúde:</b> ${game.health*100}%</p>
        <p><b>Estação do Ano:</b> ${seasonProductivity*100}%</p>
        <p><b>Tecnologia:</b> ${game.productivityTech*100}%</p>
    `);

    document.querySelector("#happiness-info")._tippy.setContent(`
        <p><b>Base:</b> 100%</p>
        <p><b>Acesso à Cerveja:</b> ${game.ale_lack == false ? "100":"0"}%</p>
        <p><b>Impactos na Felicidade.:</b> ${numberF(Math.round(game.impacts.happiness*100)-100,"balance",0)}%</p>
    `);

    document.querySelector("#food-info")._tippy.setContent(`
        <p><b>Consumo Diário:</b> ${numberF(game.food_consumption,"",1)}</p>
        <p><b>Estoque aproximado para:</b> ${numberF(game.food/game.food_consumption,"",0)} dias</p>
    `);
},tooltipUpdateRate);