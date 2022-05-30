import Pop from "./pop.js"
import Buildings from "./pop.js"
import { rand, numberFormatted, translateSeason } from "./funcs.js"

let population = 10;
let childrens = 0;
let food = 10;
let foodConsumption;
let foodProduction;
let foodLimit = 10;
let resources = 10;
let fertilityRate = 60;
let house = 0;
let farm = 0;
let totalDays = 0;
let hungry = 0;

let season = "spring";
let day = 1;
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
    let mapObj;
    console.log(mapObj);

    if(obj == "house" && resources >= 1){
        mapObj = '<div class="map-item"><span><i class="fa-solid fa-house"></i></span></div>';
        house++;
        resources--;
    }
    if(obj == "farm" && resources >= 3){
        mapObj = '<div class="map-item"><span><i class="fa-solid fa-wheat-awn"></i></span></div>';
        farm++;
        resources -= 3;
    }
    if(obj == "warehouse" && resources >= 6){
        mapObj = '<div class="map-item"><span><i class="fa-solid fa-warehouse"></i></span></div>';
        farm++;
        resources -= 6;
        foodLimit += 10;
    }

    if(mapObj)
        document.getElementById("map").innerHTML += mapObj;

    updateDataInfo();
}

function advanceDay(){
    if(day < 20){
        day++;
        totalDays++;
    }
    else{
        day = 1;
        advanceMonth();

        if(season == "spring")  season = "summer";
        else if(season == "summer")  season = "autumn";
        else if(season == "autumn")  season = "winter";
        else if(season == "winter"){
            season = "spring";
            advanceYear();
        }
    }

    foodProduction = (farm*4)/population;

    if(weather == "rain"){
        foodProduction *= 1.5;
    }
    else if(weather == "snow"){
        foodProduction *= 0;
    }

    food += foodProduction;

    if(food > foodLimit){
        food = foodLimit;
    }

    foodConsumption = (population*0.05) + (childrens*0.0375);
    food -= foodConsumption;

    if(food < foodConsumption)
        hungry++;
    else
        hungry--;

    if(hungry < 0) hungry = 0;
    if(food < 0) food = 0;

    if(hungry > 0){
        population -= rand(0,hungry);
        childrens -= rand(0,hungry);

        if(population < 0) population = 0;
        if(childrens < 0) childrens = 0;
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
    resources++;

    
    let homes = house+1 / Math.round(population/4);
    if(homes > 1) homes = 1;
    if(population == 0) homes = 0;

    const newChild = (1+(rand(0,fertilityRate)/100))*homes;
    childrens += newChild;
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
        alert("Game Over");
    }
}

let gameOver = false;
let gameSpeed = 1000;
function newTurn(){
    advanceDay();
    newWeather();
    checkGameOver();

    if(!gameOver)
        window.setTimeout(newTurn, gameSpeed);
}

newTurn();


window.onclick = e => {
    //console.log(e);
    //console.log(e.target.id);

    if(e.target.id == "add-house")              buildConstruction("house");
    else if(e.target.id == "add-farm")          buildConstruction("farm");
    else if(e.target.id == "add-warehouse")     buildConstruction("warehouse");


    else if(e.target.id == "pause") gameTimer.pause();
    else if(e.target.id == "1x")    gameSpeed = 800;
    else if(e.target.id == "10x")   gameSpeed = 80;
}