import { rand, numberFormatted, translateSeason, average, highScoreHTML, checkHighScore } from "./funcs.js"
import { soundtrack } from "./sound.js"
import { buildingsUI, resourcesUI } from "./ui.js"

import { buildingHTML, destroyBuildingHTML } from "./buildings.js"
import { logPush } from "./log.js";

let population = 10;
let sheltered = 0;
let educated = 0;
let childrens = 0;
let fertilityRate = 20;
let homelessRate = 100;

let resourceLimit = 10;

let food = 50;
let crop = 0;
let leather = 0;
let wood = 20;
let firewood = 10;
let stone = 20;
let iron = 0;
let coal = 0;
let steel = 0;
let clothes = 20;
let tools = 20;

let workforce;
let jobs;
let productivity;

let house = 0;
let school = 0;
let cropField = 0;
let farm = 0;
let tailor = 0;
let blacksmith = 0;
let lumbermill = 0;
let sawmill = 0;
let warehouse = 0;
let quarry = 0;
let mine = 0;

let warehouseStorage = 50;

let totalDays = 0;
let hungry = 0;

let score = 0;
let popRecord = population;

var gameTick;
let gameStarted = false;
let gamePaused = true;

let season = "spring";
let day = 0;
let weather = "sun";

function newWeather(){
    weather = "sun";

    switch(season){
        case "spring":
            if(rand(0,100) < 30)
                weather = "rain";
            break;
            
        case "summer":
            if(rand(0,100) < 50)
                weather = "rain";
            break;

        case "autumn":
            if(rand(0,100) < 15)
                weather = "rain";
            break;

        case "winter":
            if(rand(0,100) < 50)
                weather = "snow";
            break;
    }

    let weatherIcon;
    if(weather == "sun")    weatherIcon = '<i class="fa-solid fa-sun"></i>';
    if(weather == "rain")   weatherIcon = '<i class="fa-solid fa-cloud-rain"></i>';
    if(weather == "snow")   weatherIcon = '<i class="fa-solid fa-snowflake"></i>';
    document.getElementById("day-weather").innerHTML = weatherIcon;
}

function buildConstruction(buildingID){
    if(!gameStarted) return;

    if(buildingID == "house"){
        if(wood >= 5 && stone >= 2){
            house++;
            wood -= 5;
            stone -= 2;
        }
        else return;
    }
    else if(buildingID == "school"){
        if(wood >= 20 && stone >= 40 && iron >= 20){
            school++;
            wood -= 20;
            stone -= 40;
            iron -= 20;
        }
        else return;
    }
    else if(buildingID == "cropField"){
        if(season != "winter"){
            cropField++;
        }
        else return;
    }
    else if(buildingID == "farm"){
        if(wood >= 10){
            farm++;
            wood -= 10;
        }
        else return;
    }
    else if(buildingID == "tailor"){
        if(wood >= 30){
            tailor++;
            wood -= 30;
        }
        else return;
    }
    else if(buildingID == "blacksmith"){
        if(stone >= 30){
            blacksmith++;
            stone -= 30;
        }
        else return;
    }
    else if(buildingID == "lumbermill"){
        lumbermill++;
    }
    else if(buildingID == "sawmill"){
        if(wood >= 20 && stone >= 20){
            sawmill++;
            wood -= 20;
            stone -= 20;
        }
        else return;
    }
    else if(buildingID == "warehouse"){
        if(wood >= 40){
            warehouse++;
            wood -= 40;
        }
        else return;
    }
    else if(buildingID == "quarry"){
        if(wood >= 50){
            quarry++;
            wood -= 50;
        }
        else return;
    }
    else if(buildingID == "mine"){
        if(wood >= 100 && stone >= 50){
            mine++;
            wood -= 100;
            stone -= 50;
        }
        else return;
    }
    else{
        return;
    }

    buildingHTML(buildingID);

    checkToActivateResources();
    updateDataInfo();
}


function checkToActivateResources(){
    if(document.getElementById("crop").classList.contains("hidden") && (crop || cropField))
        document.getElementById("crop").classList.remove("hidden");

    if(document.getElementById("leather").classList.contains("hidden") && (leather || farm || tailor))
        document.getElementById("leather").classList.remove("hidden");

    if(document.getElementById("iron").classList.contains("hidden") && (iron || school || blacksmith || sawmill || mine))
        document.getElementById("iron").classList.remove("hidden");
}


function advanceDay(){
    totalDays++;
    if(day < 20){
        day++;
    }
    else{
        day = 1;
        advanceMonth();

        if(season == "spring"){
            season = "summer";

            document.getElementById("map").classList.add("map-summer");
        }
        else if(season == "summer"){
            season = "autumn";

            document.getElementById("map").classList.remove("map-summer");
            document.getElementById("map").classList.add("map-autumn");
        }  
        else if(season == "autumn"){
            season = "winter";

            document.getElementById("map").classList.remove("map-autumn");
            document.getElementById("map").classList.add("map-winter");

            //Harvest
            food += crop;

            if(crop > 0) logPush("A colheita rendeu "+Math.round(crop)+" de comida",totalDays);
            
            crop = 0;
            destroyBuildingHTML("cropField",cropField);
            cropField = 0;
        }  
        else if(season == "winter"){
            season = "spring";

            document.getElementById("map").classList.remove("map-winter");
            advanceYear();
        }
    }

    //Pop Deaths ###################################################################################
    sheltered = house*4;
    if(sheltered > population) sheltered = population;

    if(population > 0)
        homelessRate = (population-sheltered)/population;
    else
        homelessRate = 0;

    const WINTER_HOMELESS_DEATH_CHANCE = 15;
    const NORMAL_HOMELESS_DEATH_CHANCE = 5;
    let popDeath;
    let childDeath;

    if(season == "winter"){
        popDeath = Math.round((rand(0,WINTER_HOMELESS_DEATH_CHANCE)/100)*(population-sheltered));
        childDeath = Math.round((rand(0,WINTER_HOMELESS_DEATH_CHANCE*2)/100)*(homelessRate*childrens));
    }
    else if(season == "summer" && weather == "rain"){
        popDeath = Math.round((rand(0,Math.round(NORMAL_HOMELESS_DEATH_CHANCE*1.5))/100)*(population-sheltered));
        childDeath = Math.round((rand(0,Math.round(NORMAL_HOMELESS_DEATH_CHANCE*1.5))/100)*(homelessRate*childrens));
    }
    else{
        popDeath = Math.round((rand(0,NORMAL_HOMELESS_DEATH_CHANCE)/100)*(population-sheltered));
        childDeath = Math.round((rand(0,NORMAL_HOMELESS_DEATH_CHANCE*2)/100)*(homelessRate*childrens));
    }

    population -= popDeath;
    childrens -= childDeath;

    if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem abrigo",totalDays);
    if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem abrigo",totalDays);
    if(childDeath > 1)      logPush(childDeath+" crianças morreram sem abrigo",totalDays);
    if(childDeath == 1)     logPush(childDeath+" criança morreu sem abrigo",totalDays);
    

    //Workforce ###################################################################################
    workforce = (population-educated)+(educated*1.5);
    jobs = (cropField*4)+(farm*8)+(lumbermill*5)+(sawmill*5)+(tailor*3)+(blacksmith*3)+(warehouse*5)+(quarry*10)+(mine*20);

    //PRODUCTIVITY ################################################################################

    let jobAssignment = workforce/jobs;
    if(jobs == 0) jobAssignment = 1;
    if(jobAssignment > 1) jobAssignment = 1;

    let toolsAccess = tools/population;
    if(tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;

    let clothesAccess = clothes/population;
    if(clothes == 0) clothesAccess = 0;
    if(clothesAccess > 1) clothesAccess = 1;

    productivity = average([jobAssignment,toolsAccess,clothesAccess]);

    if(productivity > 1) productivity = 1;

    // Buildings Consumption ######################################################################

    wood -= (house*0.25)+(farm*0.25)+(warehouse);
    firewood -= (season == "winter" ? (house*0.1) : 0)+(blacksmith*0.25);
    stone -= 0;
    iron -= (sawmill*0.25)+(blacksmith*0.25);
    leather -= (tailor);
    tools -= (quarry*0.1)+(mine*0.5)+(tailor*0.1);
    clothes -= population*0.0125;
    tools -= population*0.0125;

    if(wood < 0) wood = 0;
    if(stone < 0) stone = 0;
    if(iron < 0) iron = 0;
    if(tools < 0) tools = 0;
    if(leather < 0) leather = 0;
    if(clothes < 0) clothes = 0;
    if(tools < 0) tools = 0;
    if(firewood < 0) firewood = 0;
    
    //RESOURCES PRODUCTION ########################################################################

    food += (farm)*productivity;
    leather += (farm*0.5)*productivity;
    iron += mine*productivity;
    stone += quarry*productivity;
    wood += (lumbermill)*productivity;
    clothes += (tailor)*productivity;
    tools += (blacksmith)*productivity;

    //FOOD PRODUCTION #############################################################################
    let weatherFoodProductivity = 1;

    if(weather == "rain"){
        weatherFoodProductivity = 4;
    }
    if(season == "winter"){
        weatherFoodProductivity = 0;
    }

    crop += (cropField*0.5)*productivity*weatherFoodProductivity;

    //FOOD CONSUMPTION ############################################################################

    const foodDifficulty = 75;
    const foodConsumption = ((population*0.05) + (childrens*0.0250))*(foodDifficulty/100);
    food -= foodConsumption;

    //RESOURCE LIMIT ##############################################################################

    resourceLimit = (1+warehouse) * warehouseStorage;

    if(food > resourceLimit)        food = resourceLimit;
    if(wood > resourceLimit)        wood = resourceLimit;
    if(stone > resourceLimit)       stone = resourceLimit;
    if(iron > resourceLimit)        iron = resourceLimit;
    if(firewood > resourceLimit)    firewood = resourceLimit;
    if(tools > resourceLimit)       tools = resourceLimit;
    if(clothes > resourceLimit)     clothes = resourceLimit;
    if(leather > resourceLimit)     leather = resourceLimit;

    //HUNGRY ######################################################################################

    if(food < foodConsumption)
        hungry++;
    else
        hungry = 0;
    if(hungry < 0)  hungry = 0;
    if(food < 0)    food = 0;
    if(hungry > 0){
        popDeath = rand(0,hungry);
        childDeath = rand(0,hungry);
        
        population -= popDeath;
        childrens -= childDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram de fome",totalDays);
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu de fome",totalDays);
        if(childDeath > 1)      logPush(childDeath+" crianças morreram de fome",totalDays);
        if(childDeath == 1)     logPush(childDeath+" criança morreu de fome",totalDays);

        if(population < 0) population = 0;
        if(childrens < 0) childrens = 0;
    }

    //#############################################################################################

    if(population > popRecord) popRecord = population;

    checkToActivateResources();
    updateDataInfo();
}

function updateDataInfo(){
    document.getElementById("totalDays").innerText = totalDays;
    document.getElementById("pop-stat").innerText = numberFormatted(population);
    document.getElementById("childrens-stat").innerText = numberFormatted(Math.round(childrens));
    document.getElementById("educated-stat").innerText = numberFormatted(Math.round(educated));
    document.getElementById("max-educated-stat").innerText = numberFormatted(Math.round(school*4));
    document.getElementById("homeless-stat").innerText = Math.round(homelessRate*100);
    document.getElementById("workforce-stat").innerText = workforce;
    document.getElementById("jobs-stat").innerText = jobs;
    document.getElementById("productivity-stat").innerText = Math.round(productivity*100);
    document.getElementById("resource-limit-stat").innerText = numberFormatted(resourceLimit);

    document.getElementById("food-stat").innerText = numberFormatted(Math.floor(food));
    document.getElementById("crop-stat").innerText = numberFormatted(Math.floor(crop));
    document.getElementById("leather-stat").innerText = numberFormatted(Math.floor(leather));
    document.getElementById("wood-stat").innerText = numberFormatted(Math.floor(wood));
    document.getElementById("firewood-stat").innerText = numberFormatted(Math.floor(firewood));
    document.getElementById("stone-stat").innerText = numberFormatted(Math.floor(stone));
    document.getElementById("iron-stat").innerText = numberFormatted(Math.floor(iron));
    document.getElementById("coal-stat").innerText = numberFormatted(Math.floor(coal));
    document.getElementById("steel-stat").innerText = numberFormatted(Math.floor(steel));
    document.getElementById("clothes-stat").innerText = numberFormatted(Math.floor(clothes));
    document.getElementById("tools-stat").innerText = numberFormatted(Math.floor(tools));

    document.getElementById("day").innerText = day;
    document.getElementById("season").innerText = translateSeason(season);
}

function advanceMonth(){
    let homes = house+1 / Math.round(population/4);
    if(homes > 1) homes = 1;
    if(population == 0) homes = 0;

    if(!hungry){
        const newChildrens = Math.round(((1+(rand(0,fertilityRate)/100)))*Math.round(population/8)*homes);
        childrens += newChildrens;

        if(newChildrens > 1)    logPush(newChildrens+" crianças nasceram no ultimo mês",totalDays-1);
        if(newChildrens == 1)   logPush(newChildrens+" criança nasceu no ultimo mês",totalDays-1);
    }
}

function advanceYear(){
    if(childrens > 1 && childrens < 4){
        childrens--;
        population++;

        if(educated < (school*4))
            educated++;

        logPush("1 criança se tornou adulta",totalDays-1);
    }
    else if(childrens > 0){
        const newPops = childrens;
        childrens -= newPops;
        population += newPops;

        if(educated < (school*4))
            educated *= school;

        if(educated > (school*4))   educated = (school*4);

        if(newPops > 0)
            logPush(newPops+" crianças se tornaram adultas",totalDays-1);
    }
}

function checkGameOver(){
    if(!population){
        gameOver = true;

        score = Math.round((popRecord * totalDays)/1000);

        alert("Game Over \n\nScore: "+score);

        checkHighScore(score);

        document.getElementById("restart").classList.remove("hidden");
        document.getElementById("pause").classList.add("hidden");
        document.getElementById("1x").classList.add("hidden");
        document.getElementById("5x").classList.add("hidden");
        document.getElementById("10x").classList.add("hidden");
    }
}

let gameOver = false;
let gameSpeed = 1000;
function newTurn(){
    checkGameOver();

    advanceDay();
    newWeather();

    if(!gameOver)
        gameTick = window.setTimeout(newTurn, gameSpeed);
}

window.setTimeout(soundtrack, rand(1500,5000));

highScoreHTML();
buildingsUI();
resourcesUI();

window.onclick = e => {
    //console.log(e);
    //console.log(e.target.id);

    if(e.target.id == "add-house")              buildConstruction("house");
    if(e.target.id == "add-school")             buildConstruction("school");
    else if(e.target.id == "add-cropField")     buildConstruction("cropField");
    else if(e.target.id == "add-farm")          buildConstruction("farm");
    else if(e.target.id == "add-tailor")        buildConstruction("tailor");
    else if(e.target.id == "add-blacksmith")    buildConstruction("blacksmith");
    else if(e.target.id == "add-lumbermill")    buildConstruction("lumbermill");
    else if(e.target.id == "add-sawmill")       buildConstruction("sawmill");
    else if(e.target.id == "add-warehouse")     buildConstruction("warehouse");
    else if(e.target.id == "add-quarry")        buildConstruction("quarry");
    else if(e.target.id == "add-mine")          buildConstruction("mine");


    else if(e.target.id == "start"){
        newTurn();
        gameStarted = true;
        gamePaused = false;
        document.getElementById("start-game").style.display = "none";
        document.getElementById("game-version").remove();
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("buildings-menu").classList.remove("hidden");
        document.getElementById("pause").classList.remove("hidden");
        document.getElementById("1x").classList.remove("hidden");
        document.getElementById("5x").classList.remove("hidden");
        document.getElementById("10x").classList.remove("hidden");
        document.querySelector(".interface").style.display = "block";
        document.getElementById("right-section").style.display = "flex";
    } 
    else if(e.target.id == "restart"){
        document.location.reload(true);
    }
    else if(e.target.id == "pause"){
        clearTimeout(gameTick);
        gamePaused = true;
        document.getElementById("pause").classList.add("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    } 
    else if(e.target.id == "1x"){
        clearTimeout(gameTick);
        gamePaused = false;
        gameSpeed = 2000;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "5x"){
        clearTimeout(gameTick);
        gamePaused = false;
        gameSpeed = 400;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.add("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "10x"){
        clearTimeout(gameTick);
        gamePaused = false;
        gameSpeed = 200;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.add("btn-active");
    }   
}
/*
document.addEventListener('mousemove', function(e) {
    let box = document.getElementById('floating-box');
    box.style.left =  e.pageX + 'px';
    box.style.top = e.pageY + 'px';
});

document.getElementById("add-house").addEventListener("mouseover", function(e) {
    document.getElementById('floating-box').hidden = false;
}, false);
*/