import { rand, numberFormatted, translateSeason, average, highScoreHTML, checkHighScore } from "./funcs.js"
import { soundtrack } from "./sound.js"
import { buildingsUI } from "./ui.js"

import { buildingHTML, destroyBuildingHTML, qtyToDestroy } from "./buildings.js"
import { logPush } from "./log.js";

let population = 10;
let sheltered = 0;
let educated = 0;
let students = 0;
let childrens = 0;
let fertilityRate = 20;
let homelessRate = 100;

let food = 50;
let foodConsumption = 0;
let foodProduction = 0;
let foodLimit = 10;

let wood = 16;
let stone = 8;
let iron = 4;

let workforce;
let manpower;
let jobs;
let productivity;

let house = 0;
let farm = 0;
let warehouse = 0;
let lumbermill = 0;
let quarry = 0;
let mine = 0;
let builder = 0;

let warehouseStorage = 50;
let farmHarvest = 0;

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
        if(manpower >= 1 && wood >= 1){
            house++;
            wood--;
        }
        else return;
    }
    else if(buildingID == "farm"){
        if(wood >= 2 && season != "winter"){
            farm++;
            wood -= 2;
        }
        else return;
    }
    else if(buildingID == "warehouse"){
        if(manpower >= 6 && wood >= 10){
            warehouse++;
            wood -= 10;
        }
        else return;
    }
    else if(buildingID == "lumbermill"){
        if(manpower >= 3){
            lumbermill++;
        }
        else return;
    }
    else if(buildingID == "builder"){
        if(manpower >= 3 && wood >= 3){
            builder++;
            wood -= 3;
        }
        else return;
    }
    else if(buildingID == "quarry"){
        if(manpower >= 20 && wood >= 20){
            quarry++;
        }
        else return;
    }
    else if(buildingID == "mine"){
        if(manpower >= 30 && wood >= 30 && stone >= 30){
            mine++;
        }
        else return;
    }
    else{
        return;
    }

    buildingHTML(buildingID);

    updateDataInfo();
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
            food += farmHarvest;
            foodProduction = farmHarvest;

            if(farmHarvest > 0) logPush("A colheita rendeu "+Math.round(farmHarvest)+" de comida",totalDays);
            
            farmHarvest = 0;
            destroyBuildingHTML("farm",farm);
            farm = 0;
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
    jobs = (farm*4)+(warehouse*5)+(lumbermill*2)+(builder*3)+(quarry*20)+(mine*30);
    
    manpower = workforce - jobs + (builder*6);
    if(manpower < 0) manpower = 0;

    //PRODUCTIVITY ################################################################################

    let jobAssignment = workforce/jobs;
    if(jobs == 0) jobAssignment = 0;
    if(jobAssignment > 1) jobAssignment = 1;

    productivity = average([jobAssignment]);

    if(productivity > 1) productivity = 1;

    //RESOURCES PRODUCTION ########################################################################

    iron += mine*productivity;
    stone += quarry*productivity;
    wood += (0.5*lumbermill)*productivity;

    //FOOD PRODUCTION #############################################################################
    let weatherFoodProductivity = 1;

    if(weather == "rain"){
        weatherFoodProductivity = 2;
    }
    if(season == "winter"){
        weatherFoodProductivity = 0;
    }

    farmHarvest += (farm*0.5)*productivity*weatherFoodProductivity;

    //FOOD CONSUMPTION ############################################################################
    foodConsumption = (population*0.05) + (childrens*0.0250);
    food -= foodConsumption;

    //FOOD LIMIT ##################################################################################
    foodLimit = (1+warehouse) * warehouseStorage;
    if(food > foodLimit) food = foodLimit;

    //HUNGRY ######################################################################################
    if(food < foodConsumption)
        hungry++;
    else
        hungry--;
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

    updateDataInfo();
}

function updateDataInfo(){
    document.getElementById("totalDays").innerText = totalDays;
    document.getElementById("pop-stat").innerText = numberFormatted(population);
    document.getElementById("childrens-stat").innerText = numberFormatted(Math.round(childrens));
    document.getElementById("homeless-stat").innerText = Math.round(homelessRate*100);
    document.getElementById("food-stat").innerText = numberFormatted(Math.round(food));
    document.getElementById("max-food-stat").innerText = numberFormatted(foodLimit);
    document.getElementById("food-prod-stat").innerText = numberFormatted((-foodConsumption).toFixed(1));
    document.getElementById("workforce-stat").innerText = workforce;
    document.getElementById("jobs-stat").innerText = jobs;
    document.getElementById("wood-stat").innerText = numberFormatted(Math.round(wood));
    document.getElementById("stone-stat").innerText = numberFormatted(Math.round(stone));
    document.getElementById("iron-stat").innerText = numberFormatted(Math.round(iron));
    document.getElementById("manpower-stat").innerText = manpower;
    document.getElementById("harvest-stat").innerText = numberFormatted(Math.round(farmHarvest));
    document.getElementById("productivity-stat").innerText = (productivity*100).toFixed(1);

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

        if(newChildrens > 1)    logPush(newChildrens+" crianças nasceram",totalDays);
        if(newChildrens == 1)   logPush(newChildrens+" criança nasceu",totalDays);
    }

    // Buildings Consumption
    const builderStoneConsumption = builder*0.5;
    const builderWoodConsumption = builder*0.5;

    if(stone < builderWoodConsumption){
        const toDestroy = qtyToDestroy(wood,builderWoodConsumption,builder);
        builder -= toDestroy;
        wood = 0;
        destroyBuildingHTML("builder",toDestroy);
        
        if(toDestroy > 1)    logPush(toDestroy+" Carpintarias se destruiram por falta de Madeira",totalDays);
        if(toDestroy == 1)   logPush(toDestroy+" Carpintaria se destruiu por falta de Madeira",totalDays);
    }
    else{
        wood -= builderWoodConsumption;
    }

    if(stone < builderStoneConsumption){
        const toDestroy = qtyToDestroy(stone,builderStoneConsumption,builder);
        builder -= toDestroy;
        stone = 0;
        destroyBuildingHTML("builder",toDestroy);
        
        if(toDestroy > 1)    logPush(toDestroy+" Carpintarias se destruiram por falta de Pedra",totalDays);
        if(toDestroy == 1)   logPush(toDestroy+" Carpintaria se destruiu por falta de Pedra",totalDays);
    }
    else{
        stone -= builderStoneConsumption;
    }
}

function advanceYear(){
    if(childrens > 1 && childrens < 4){
        childrens--;
        population++;

        logPush("1 criança se tornou adulta",totalDays);
    }
    else if(childrens > 0){
        const newPops = Math.floor(childrens * 0.5);
        childrens -= newPops;
        population += newPops;

        if(newPops > 0)
            logPush(newPops+" crianças se tornaram adultas",totalDays);
    }

    // Buildings Consumption
    const houseWoodConsumption = house;
    if(wood < houseWoodConsumption){
        const toDestroy = qtyToDestroy(wood,houseWoodConsumption,house);
        house -= toDestroy;
        wood = 0;
        destroyBuildingHTML("house",toDestroy);

        if(toDestroy > 1)    logPush(toDestroy+" Casas se destruiram por falta de Madeira",totalDays);
        if(toDestroy == 1)   logPush(toDestroy+" Casas se destruiu por falta de Madeira",totalDays);
    }
    else{
        wood -= house;
    }
    
    const lumbermillIronConsumption = lumbermill;
    if(iron < lumbermillIronConsumption){
        const toDestroy = qtyToDestroy(iron,lumbermillIronConsumption,lumbermill);
        lumbermill -= toDestroy;
        iron = 0;
        destroyBuildingHTML("lumbermill",toDestroy);
        
        if(toDestroy > 1)    logPush(toDestroy+" Serrarias se destruiram por falta de Ferro",totalDays);
        if(toDestroy == 1)   logPush(toDestroy+" Serraria se destruiu por falta de Ferro",totalDays);
    }
    else{
        iron -= lumbermillIronConsumption;
    }
}

function checkGameOver(){
    if(!population){
        gameOver = true;

        score = popRecord * totalDays;

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

window.onclick = e => {
    //console.log(e);
    //console.log(e.target.id);

    if(e.target.id == "add-house")              buildConstruction("house");
    else if(e.target.id == "add-farm")          buildConstruction("farm");
    else if(e.target.id == "add-warehouse")     buildConstruction("warehouse");
    else if(e.target.id == "add-lumbermill")    buildConstruction("lumbermill");
    else if(e.target.id == "add-quarry")        buildConstruction("warehouse");
    else if(e.target.id == "add-mine")          buildConstruction("warehouse");
    else if(e.target.id == "add-builder")          buildConstruction("builder");


    else if(e.target.id == "start"){
        newTurn();
        gameStarted = true;
        gamePaused = false;
        document.getElementById("start-game").style.display = "none";
        document.getElementById("game-version").remove();
        document.getElementById("1x").classList.add("btn-active");
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
        gameSpeed = 2000;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "5x"){
        clearTimeout(gameTick);
        gameSpeed = 400;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.add("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "10x"){
        clearTimeout(gameTick);
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