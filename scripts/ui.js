import { buildingsData } from "./buildingsData.js"
import { resources } from "./resourcesData.js"
import { professions } from "./professions.js"
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
export function professionsUI(){
    const div = document.getElementById("professions");
    div.innerHTML += `
        <div class="profession-stat">
            <p>Ociosos:</p>
            <input id="idle-input" class="professions-slider" type="range" value="0" step="1" disabled>
            <span id="idle-stat">10</span>
        </div>
    `;

    for(let i = 1; i < professions.length; i++){
        const p = professions[i];

        div.innerHTML += `
            <div class="profession-stat">
                <p>${p.name}:</p>
                <input id="${p.id}-input" class="professions-slider" type="range" value="0" step="1">
                <span id="${p.id}-stat">10</span>/<span id="${p.id}-jobs-stat">10</span>
            </div>
        `;
    }
}

export function updateDataInfo(){
    document.getElementById("totalDays").innerText = game.totalDays;
    document.getElementById("pop-stat").innerText = numberFormatted(game.population);
    document.getElementById("pop-record-stat").innerText = numberFormatted(game.popRecord);
    document.getElementById("childrens-stat").innerText = numberFormatted(Math.round(game.childrens));
    document.getElementById("educated-stat").innerText = numberFormatted(Math.round(game.educated));
    document.getElementById("max-educated-stat").innerText = numberFormatted(Math.round(game.school*4));
    
    let settledRate = 100-Math.round(((game.population - game.sheltered)/game.population)*100);
    if(settledRate > 100) settledRate = 100;
    if(!settledRate) settledRate = 0;
    document.getElementById("settled-stat").innerText = settledRate;
        
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

    document.getElementById("productivity-bar").style.width = Math.round(game.productivity*100).toString()+"%";
    document.getElementById("settled-bar").style.width = settledRate.toString()+"%";

    resourceLack();
    professionsStat();
}

function resourceLack(){
    if(game.food_lack)      document.getElementById("food-stat").classList.add("lack");
    else                    document.getElementById("food-stat").classList.remove("lack");
    if(game.crop_lack)      document.getElementById("crop-stat").classList.add("lack");
    else                    document.getElementById("crop-stat").classList.remove("lack");
    if(game.leather_lack)   document.getElementById("leather-stat").classList.add("lack");
    else                    document.getElementById("leather-stat").classList.remove("lack");
    if(game.wood_lack)      document.getElementById("wood-stat").classList.add("lack");
    else                    document.getElementById("wood-stat").classList.remove("lack");
    if(game.firewood_lack)  document.getElementById("firewood-stat").classList.add("lack");
    else                    document.getElementById("firewood-stat").classList.remove("lack");
    if(game.stone_lack)     document.getElementById("stone-stat").classList.add("lack");
    else                    document.getElementById("stone-stat").classList.remove("lack");
    if(game.iron_lack)      document.getElementById("iron-stat").classList.add("lack");
    else                    document.getElementById("iron-stat").classList.remove("lack");
    if(game.clothes_lack)   document.getElementById("clothes-stat").classList.add("lack");
    else                    document.getElementById("clothes-stat").classList.remove("lack");
    if(game.tools_lack)     document.getElementById("tools-stat").classList.add("lack");
    else                    document.getElementById("tools-stat").classList.remove("lack");
}

function professionsStat(){
    game.worker = Number(document.getElementById("worker-input").value);
    game.farmer = Number(document.getElementById("farmer-input").value);
    game.herdsman = Number(document.getElementById("herdsman-input").value);
    game.lumberjack = Number(document.getElementById("lumberjack-input").value);
    game.tailor_prof = Number(document.getElementById("tailor-input").value);
    game.teacher = Number(document.getElementById("teacher-input").value);
    game.blacksmith_prof = Number(document.getElementById("blacksmith-input").value);
    game.miner = Number(document.getElementById("miner-input").value);

    const array = ["worker","farmer","herdsman","lumberjack","tailor","teacher","blacksmith","miner"];
    const arrayP = [game.worker,game.farmer,game.herdsman,game.lumberjack,game.tailor_prof,game.teacher,game.blacksmith_prof,game.miner];
    const arrayPjobs = [game.worker_jobs,game.farmer_jobs,game.herdsman_jobs,game.lumberjack_jobs,game.tailor_jobs,game.teacher_jobs,game.blacksmith_jobs,game.miner_jobs];

    game.idle = game.population;
    for(let i = 0; i < arrayP.length; i++){
        game.idle -= arrayP[i];
    }

    document.getElementById("idle-input").value = game.idle<0?0:game.idle;
    document.getElementById("idle-input").max = game.population;
    document.getElementById("idle-stat").innerText = game.idle;

    for(let i = 0; i < array.length; i++) {
        if(arrayPjobs[i] == 0)   document.getElementById(array[i]+"-input").disabled = true;
        else    document.getElementById(array[i]+"-input").disabled = false;

        document.getElementById(array[i]+"-input").value = arrayP[i];
        document.getElementById(array[i]+"-input").max = (game.idle+arrayP[i])<arrayPjobs[i]?(game.idle+arrayP[i]):arrayPjobs[i];
        document.getElementById(array[i]+"-stat").innerText = arrayP[i];
        document.getElementById(array[i]+"-jobs-stat").innerText = arrayPjobs[i];
    }
    /*
    if(game.worker_jobs == 0)   document.getElementById("worker-input").disabled = true;
    else    document.getElementById("worker-input").disabled = false;
    document.getElementById("worker-input").value = game.worker;
    document.getElementById("worker-input").max = (game.idle+game.worker)<game.worker_jobs?(game.idle+game.worker):game.worker_jobs;
    document.getElementById("worker-stat").innerText = game.worker;
    document.getElementById("worker-jobs-stat").innerText = game.worker_jobs;
    */
}