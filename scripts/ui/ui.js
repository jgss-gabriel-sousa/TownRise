import { resources } from "../../data/resourcesData.js"
import { popsData } from "../../data/popsData.js"
import { numberF, numberBalanceFormatted, translateSeason } from "../funcs.js"
import { game } from "../../data/gameData.js"
import { modifiersData } from "../../data/modifiersData.js";

export function resourcesUI(){
    const element = document.getElementById("resources");
    let html = "";

    let res = {
        food: [],
        rawMaterial: [],
        refinedMaterial: [],
        endProduct: [],
        luxury: [],
    }

    for(const r in resources){
        if(resources[r].type == "food")                res.food.push(r);
        if(resources[r].type == "raw material")        res.rawMaterial.push(r);
        if(resources[r].type == "refined material")    res.refinedMaterial.push(r);
        if(resources[r].type == "end product")         res.endProduct.push(r);
        if(resources[r].type == "luxury")              res.luxury.push(r);
    }
    
    for(const t in res){
        const type = res[t];

        html += `<div class="resources-row">`;

        for(let j = 0; j < type.length; j++){
            const r = type[j];

            html += `
                <button class="resources-btn" id="${r}">
                    <div>
                        <img src="./img/icons/${r}.png">
                        <p>${resources[r].name}</p>
                    </div>
                    <p id="${r}-stat"></p>
                    <small id="${r}-balance-stat">0</small>
                </button>
            `
        }
        html += "</div>";
        element.innerHTML = html;
    }
}

export function professionsUI(){
    let html = `
    <table>
        <tr>
            <td><img src="./img/icons/idle.png"></td>
            <td><p>Ocioso:</p></td>
            <td></td>
            <td><p><span id="idle-stat">10</span></p></td>
        </tr>
    `;

    for(const p in popsData){
        if(p == "idle") continue;

        html += `
            <tr>
                <td><img src="./img/icons/${p}.png"></td>
                <td><p>${popsData[p].name}:</p></td>
                <td><input id="${p}-input" class="professions-slider" type="range" value="0" step="1"></td>
                <td><p><span id="${p}-stat">10</span>/<span id="${p}-jobs-stat">10</span></p></td>
            </tr>
        `;
    }

    html += "</table>"

    document.getElementById("pops").innerHTML = html;
}

export function updateDataInfo(){
    const statsElements = ["totalDays","day","year","population","popLimit","food","knowledge"];
    statsElements.forEach(e => {
        document.getElementById(e+"-stat").innerText = numberF(game[e],"",0);
    });

    document.getElementById("season").innerText = translateSeason(game.season);
    document.getElementById("score-stat").innerText = numberF(game.score,"",0);

    resourcesStatAndLack();
    professionsStat();

    modifiersUI();

    //Bars
    const barsElements = ["productivity","happiness","lifeQuality"];
    barsElements.forEach(e => {
        document.getElementById(e+"-bar").style.width = Math.round(game[e]*100).toString()+"%";
        document.getElementById(e+"-stat").innerText = numberF(game[e]*100,"",0);
    });
}

export function modifiersUI(){
    function createTippy(id){
        let desc = "<h4>"+modifiersData[id].name+"</h4>";
        modifiersData[id].description.forEach(e => {
            desc += `<p>${e}</p>`;
        });

        tippy("#"+id+"-modifier", {
            content: desc,
            allowHTML: true,
        });
    }
    function createModElement(id){
        document.getElementById("active-modifiers").innerHTML += `
            <div class="container modifier-icon" id="${id}-modifier">
                <img src="./img/icons/modifiers/${id}.png">
                <small>${game.modifiers[id]}</small>
            </div>
        `;

        createTippy(id);
    }
    function updateModElement(id){
        document.querySelector("#"+id+"-modifier small").innerText = game.modifiers[id];
    }
    function deleteModElement(id){
        document.getElementById(id+"-modifier").remove();
    }
    //###############################################################3

    for(const m in game.modifiers){
        if(document.getElementById(m+"-modifier") == null){
            createModElement(m);
        }
        else{
            updateModElement(m);
        }
    }

    for(const m in game.modifiers){
        if(document.getElementById(m+"-modifier")._tippy == undefined)
            createTippy(m);
    }

    document.querySelectorAll(".modifier-icon").forEach(e => {
        const elID = e.id.slice(0, -9);
        
        if(!game.modifiers.hasOwnProperty(elID)){
            deleteModElement(elID);
        }
    });
}

function resourcesStatAndLack(){
    for(const r in resources){
        document.getElementById(r+"-stat").innerText = numberF(Math.floor(game[r]),"",0);
        document.getElementById(r+"-balance-stat").innerText = numberBalanceFormatted(game[r+"_balance"]);

        if(game[r+"_lack"])
            document.getElementById(r+"-stat").classList.add("lack");
        else
            document.getElementById(r+"-stat").classList.remove("lack");
    }
}

function professionsStat(){
    game.idle = game.population;
    for(const j in popsData){     
        if(j == "idle") continue;
           
        game[j] = Number(document.getElementById(j+"-input").value);

        game.idle -= game[j];
    }

    for(const j in popsData){
        if(j == "idle") continue;

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
}