import Pop from "./pop.js"
import Buildings from "./pop.js"
import { rand, numberFormatted, translateSeason } from "./funcs.js"

let population = 10;
let sheltered;
let childrens = 0;
let food = 10;
let foodConsumption;
let foodProduction;
let foodLimit = 10;
let resources = 10;
let fertilityRate = 40;
let workforce;

let house = 0;
let farm = 0;
let warehouse = 0;

let warehouseStorage = 20;

let totalDays = 0;
let hungry = 0;

let score = 0;
let popRecord = population;
let timeToReachPopRecord;

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

function buildConstruction(obj){
    if(obj == "house" && resources >= 1){
        const variation = rand(0,1);
        if(variation == 0)  document.getElementById("map-houses").innerHTML += '<div class="map-item map-item-md"><img src="./img/house0.png"></div>';
        //if(variation == 1)  document.getElementById("map-houses").innerHTML += '<div class="map-item map-item-sm"><img src="./img/house1.png"></div>';

        house++;
        resources--;
    }
    if(obj == "farm" && resources >= 3){
        const variation = rand(0,2);
        if(variation == 0)  document.getElementById("map-farms").innerHTML += '<div class="map-item map-item-sm"><img src="./img/farm.png"></div>';
        if(variation == 1)  document.getElementById("map-farms").innerHTML += '<div class="map-item map-item-sm"><img src="./img/farm.png"></div>';

        //document.getElementById("map-farms").innerHTML += '<div class="map-item map-farm"><img src="./img/farm.png"></div>';

        farm++;
        resources -= 3;
    }
    if(obj == "warehouse" && resources >= 6){
        document.getElementById("map-buildings").innerHTML += '<div class="map-item map-item-md"><img src="./img/warehouse.png"></div>';
        
        warehouse++;
        resources -= 6;
    }

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
        }
        else if(season == "summer"){
            season = "autumn";
        }  
        else if(season == "autumn"){
            season = "winter";
        }  
        else if(season == "winter"){
            season = "spring";

            advanceYear();
        }
    }

    //FOOD PRODUCTION #############################################################################
    foodProduction = population/4;
    if(foodProduction > farm) foodProduction = farm;

    if(weather == "rain"){
        foodProduction *= 1.5;
    }
    else if(weather == "snow"){
        foodProduction *= 0;
    }
    food += foodProduction;

    //FOOD CONSUMPTION ############################################################################
    foodConsumption = (population*0.05) + (childrens*0.0375);
    food -= foodConsumption;

    //FOOD LIMIT ##################################################################################
    foodLimit = (1+warehouse) * warehouseStorage;
    if(food > foodLimit)    food = foodLimit;

    //HUNGRY ######################################################################################
    if(food < foodConsumption)
        hungry++;
    else
        hungry--;
    if(hungry < 0)  hungry = 0;
    if(food < 0)    food = 0;
    if(hungry > 0){
        population -= rand(0,hungry);
        childrens -= rand(0,hungry);

        if(population < 0) population = 0;
        if(childrens < 0) childrens = 0;
    }

    //#############################################################################################

    if(population > popRecord){
        popRecord = population;
        timeToReachPopRecord = totalDays;
    }

    updateDataInfo();
}

function updateDataInfo(){
    document.getElementById("totalDays").innerText = totalDays;
    document.getElementById("pop-stat").innerText = numberFormatted(population);
    document.getElementById("childrens-stat").innerText = numberFormatted(Math.floor(childrens));
    document.getElementById("food-stat").innerText = numberFormatted(Math.round(food));
    document.getElementById("food-prod-stat").innerText = (foodProduction-foodConsumption).toFixed(1);
    document.getElementById("resources-stat").innerText = resources;

    document.getElementById("day").innerText = day;
    document.getElementById("season").innerText = translateSeason(season);
}

function advanceMonth(){
    resources += Math.round(population/4)+1;
    resources -= farm;
    if(resources > population) resources = population;
    if(resources < 0) resources = 1;
    
    let homes = house+1 / Math.round(population/4);
    if(homes > 1) homes = 1;
    if(population == 0) homes = 0;

    if(!hungry){
        const newChild = ((1+(rand(0,fertilityRate)/100))*homes)*(population/8);
        childrens += newChild;
    }
}

function advanceYear(){
    if(childrens > 1 && childrens < 4){
        childrens--;
        population++;
    }
    else if(childrens > 0){
        const newPops = Math.floor(childrens * 0.25);
        childrens -= newPops;
        population += newPops;
    }
}

function checkGameOver(){
    if(population == 0 && childrens == 0){
        gameOver = true;

        score = Math.floor((popRecord-10)/((timeToReachPopRecord+1)/1000));
        if(!score)
            score = 0;

        alert("Game Over \n\nScore: "+score);
    }
}

let gameOver = false;
let gameSpeed = 1000;
function newTurn(){
    checkGameOver();

    advanceDay();
    newWeather();

    if(!gameOver)
        window.setTimeout(newTurn, gameSpeed);
}


window.onclick = e => {
    //console.log(e);
    //console.log(e.target.id);

    if(e.target.id == "add-house")              buildConstruction("house");
    else if(e.target.id == "add-farm")          buildConstruction("farm");
    else if(e.target.id == "add-warehouse")     buildConstruction("warehouse");


    else if(e.target.id == "start"){
        newTurn();
        document.getElementById("start").remove();
        document.getElementById("1x").classList.add("btn-active");
    } 
    else if(e.target.id == "1x"){
        gameSpeed = 1500;
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "5x"){
        gameSpeed = 300;
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.add("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "10x"){
        gameSpeed = 150;
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.add("btn-active");
    }   
}