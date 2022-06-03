import { buildingsData } from "./buildingsData.js"
import { resources } from "./resourcesData.js"
import { numberFormatted, numberBalanceFormatted, translateSeason } from "./funcs.js"
import { game } from "./gameData.js"

export function buildingsUI(){
    const menuDiv = document.getElementById("buildings-menu");
    let actualButtonRow = 0;
    let buttonRow = `<div class="buildings-btn">`;

    for(let i = 0; i < buildingsData.length; i++) {
        const element = buildingsData[i];
        let button;

        if(element.buttonRow > actualButtonRow){
            buttonRow += "</div>";
            menuDiv.innerHTML += buttonRow;

            buttonRow = `<div class="buildings-btn">`;
            actualButtonRow = element.buttonRow;
        }

        button =`<button class="btn" id="add-${element.id}">${element.name}
                    <span class="tooltip">`

        if(element.build.length > 0)
            button += `<b>Construção</b><br>`
    
        for(let j = 0; j < element.build.length; j++){
            button += element.build[j]+"<br>";

            if(j+1 == element.build.length)
                button += "<br>"
        }

        if(element.needs.length > 0)
            button += `<b>Manutenção</b><br>`
    
        for(let j = 0; j < element.needs.length; j++){
            button += element.needs[j]+"<br>";

            if(j+1 == element.needs.length)
                button += "<br>"
        }

        if(element.result.length > 0)
            button += `<b>Gera</b><br>`
        
        for(let j = 0; j < element.result.length; j++){
            button += element.result[j];
            
            if(j+1 != element.result.length)
                button += "<br>"
        }
        button += `</span></button>`;

        buttonRow += button;
    }
    buttonRow += "</div>";
    menuDiv.innerHTML += buttonRow;
}


export function resourcesUI(){
    const div = document.getElementById("resources");

    for(let i = 0; i < resources.length; i++){
        const r = resources[i];

        div.innerHTML += `
            <button class="resources-btn" id="${r.id}">
                <div>
                    <img src="./img/icons/${r.id}.png">
                    <p>${r.name}</p>
                </div>
                <p id="${r.id}-stat"></p>
                <small id="${r.id}-balance-stat">0</small>
            </button>
        `;
    }
}

export function updateDataInfo(){
    document.getElementById("totalDays").innerText = game.totalDays;
    document.getElementById("pop-stat").innerText = numberFormatted(game.population);
    document.getElementById("childrens-stat").innerText = numberFormatted(Math.round(game.childrens));
    document.getElementById("educated-stat").innerText = numberFormatted(Math.round(game.educated));
    document.getElementById("max-educated-stat").innerText = numberFormatted(Math.round(game.school*4));
    if(game.population > 0)
        document.getElementById("homeless-stat").innerText = Math.round(((game.population - game.sheltered)/game.population)*100);
    else
        document.getElementById("homeless-stat").innerText = 0;
    document.getElementById("workforce-stat").innerText = game.workforce;
    document.getElementById("jobs-stat").innerText = game.jobs;
    document.getElementById("productivity-stat").innerText = Math.round(game.productivity*100);
    document.getElementById("resource-limit-stat").innerText = numberFormatted(game.resourceLimit);

    document.getElementById("food-stat").innerText = numberFormatted(Math.floor(game.food));
    document.getElementById("crop-stat").innerText = numberFormatted(Math.floor(game.crop));
    document.getElementById("leather-stat").innerText = numberFormatted(Math.floor(game.leather));
    document.getElementById("wood-stat").innerText = numberFormatted(Math.floor(game.wood));
    document.getElementById("firewood-stat").innerText = numberFormatted(Math.floor(game.firewood));
    document.getElementById("stone-stat").innerText = numberFormatted(Math.floor(game.stone));
    document.getElementById("iron-stat").innerText = numberFormatted(Math.floor(game.iron));
    document.getElementById("clothes-stat").innerText = numberFormatted(Math.floor(game.clothes));
    document.getElementById("tools-stat").innerText = numberFormatted(Math.floor(game.tools));

    document.getElementById("food-balance-stat").innerText = numberBalanceFormatted(game.food_balance);
    document.getElementById("crop-balance-stat").innerText = numberBalanceFormatted(game.crop_balance);
    document.getElementById("leather-balance-stat").innerText = numberBalanceFormatted(game.leather_balance);
    document.getElementById("wood-balance-stat").innerText = numberBalanceFormatted(game.wood_balance);
    document.getElementById("firewood-balance-stat").innerText = numberBalanceFormatted(game.firewood_balance);
    document.getElementById("stone-balance-stat").innerText = numberBalanceFormatted(game.stone_balance);
    document.getElementById("iron-balance-stat").innerText = numberBalanceFormatted(game.iron_balance);
    document.getElementById("clothes-balance-stat").innerText = numberBalanceFormatted(game.clothes_balance);
    document.getElementById("tools-balance-stat").innerText = numberBalanceFormatted(game.tools_balance);

    document.getElementById("day").innerText = game.day;
    document.getElementById("season").innerText = translateSeason(game.season);
}