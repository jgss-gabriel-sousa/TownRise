import { resources } from "../resourcesData.js"
import { popsData } from "../../data/popsData.js"
import { numberF, numberBalanceFormatted, translateSeason } from "../funcs.js"
import { game } from "../gameData.js"

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

export function savedGamesHTML(){
    let villages = localStorage.getItem("mv-saved-villages");

    if(villages == null ||villages == "null" || villages == "[]" || villages.length == 0){
        document.getElementById("load").classList.add("hidden");
        document.getElementById("saved-villages").style.display = "none";
        return;
    }

    villages = JSON.parse(villages);
    let html;

    for(let i = 0; i < villages.length; i++){
        html += `<option value="${villages[i].villageName}">${villages[i].villageName}</option>`;
    }

    document.getElementById("village-to-load").innerHTML = html;
}

export function updateDataInfo(){
    document.getElementById("totalDays").innerText = numberF(game.totalDays,"",0);
    document.getElementById("totalYears").innerText = numberF(game.year,"",0);
    document.getElementById("pop-stat").innerText = numberF(game.population,"",0);
    document.getElementById("science-stat").innerText = numberF(game.science,"",0);
    
    let settledRate = 100-Math.round(((game.population - game.sheltered)/game.population)*100);
    if(settledRate > 100) settledRate = 100;
    if(!settledRate) settledRate = 0;
    document.getElementById("settled-stat").innerText = settledRate;
        
    document.getElementById("productivity-stat").innerText = Math.round(game.productivity*100);
    document.getElementById("happiness-stat").innerText = Math.round(game.happiness*100);
    document.getElementById("health-stat").innerText = Math.round(game.health*100);
    document.getElementById("resource-limit-stat").innerText = numberF(game.resourceLimit,"",0);

    for(let i = 0; i < resources.length; i++){
        const r = resources[i].id;

        document.getElementById(r+"-stat").innerText = numberF(Math.floor(game[r]),"",0);
        document.getElementById(r+"-balance-stat").innerText = numberBalanceFormatted(game[r+"_balance"]);

        if(game[r+"_lack"])
            document.getElementById(r+"-stat").classList.add("lack");
        else
            document.getElementById(r+"-stat").classList.remove("lack");
    }

    document.getElementById("day").innerText = game.day;
    document.getElementById("season").innerText = translateSeason(game.season);

    document.getElementById("productivity-bar").style.width = Math.round(game.productivity*100).toString()+"%";
    document.getElementById("settled-bar").style.width = settledRate.toString()+"%";
    document.getElementById("happiness-bar").style.width = Math.round(game.happiness*100).toString()+"%";
    document.getElementById("health-bar").style.width = Math.round(game.health*100).toString()+"%";

    professionsStat();
}

function professionsStat(){
    /*
    game.idle = game.population;
    for(let i = 1; i < popsData.length; i++){
        const j = popsData[i].id;
        
        game[j] = Number(document.getElementById(j+"-input").value);

        game.idle -= game[j];
    }

    for(let i = 1; i < popsData.length; i++){
        const j = popsData[i].id;
        
        if(game[j+"_jobs"] == 0)   
            document.getElementById(j+"-input").disabled = true;
        else
            document.getElementById(j+"-input").disabled = false;

        document.getElementById(j+"-input").value = game[j];
        document.getElementById(j+"-input").max = (game.idle+game[j])<game[j+"_jobs"]?(game.idle+game[j]):game[j+"_jobs"];
        document.getElementById(j+"-stat").innerText = game[j];
        document.getElementById(j+"-jobs-stat").innerText = game[j+"_jobs"];
    }

    if(game.idle < 0) game.idle = 0;
    document.getElementById("idle-stat").innerText = game.idle;
    */
}