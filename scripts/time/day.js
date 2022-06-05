import { game } from "../gameData.js";
import { logPush } from "../log.js";
import { advanceMonth } from "./month.js";
import { advanceYear } from "./year.js";
import { buildingsUpdate } from "../buildings.js";
import { rand } from "../funcs.js";
import { updateDataInfo } from "../ui.js";

export function advanceDay(){
    game.totalDays++;
    if(game.day < 30){
        game.day++;
    }
    else{
        game.day = 1;
        advanceMonth();

        if(game.season == "spring"){
            game.season = "summer";

            document.getElementById("map").classList.add("map-summer");
        }
        else if(game.season == "summer"){
            game.season = "autumn";

            document.getElementById("map").classList.remove("map-summer");
            document.getElementById("map").classList.add("map-autumn");
        }  
        else if(game.season == "autumn"){
            game.season = "winter";

            document.getElementById("map").classList.remove("map-autumn");
            document.getElementById("map").classList.add("map-winter");

            //Harvest
            game.food += game.crop;

            if(game.crop > 0) logPush("A colheita rendeu "+Math.round(game.crop)+" de comida");
            
            game.crop = 0;
            destroy("cropField",game.cropField);
            game.cropField = 0;
        }  
        else if(game.season == "winter"){
            game.season = "spring";

            document.getElementById("map").classList.remove("map-winter");
            advanceYear();
        }
    }

    // RESET RESOURCES BALANCES
    game.food_balance = 0;
    game.crop_balance = 0;
    game.leather_balance = 0;
    game.wood_balance = 0;
    game.firewood_balance = 0;
    game.stone_balance = 0;
    game.iron_balance = 0;
    game.tools_balance = 0;
    game.clothes_balance = 0;

    game.food_lack = false;
    game.crop_lack = false;
    game.leather_lack = false;
    game.wood_lack = false;
    game.firewood_lack = false;
    game.stone_lack = false;
    game.iron_lack = false;
    game.tools_lack = false;
    game.clothes_lack = false;
    
    //Workforce ###################################################################################
    game.workforce = (game.population - game.educated)+(game.educated*1.5);

    //PRODUCTIVITY ################################################################################
    let jobAssignment = game.workforce/game.jobs;
    if(game.jobs == 0) jobAssignment = 1;
    if(jobAssignment > 1) jobAssignment = 1;
    
    game.jobs = 0;

    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;

    game.tools_balance -= game.population*0.0125;

    game.productivity = jobAssignment*toolsAccess;

    if(game.productivity > 1) game.productivity = 1;

    //Updates #####################################################################################

    buildingsUpdate();
    
    //Homeless Deaths #############################################################################
    
    let homelessRate = 100;
    if(game.population > 0)
        homelessRate = (game.population - game.sheltered)/game.population;
    else
        homelessRate = 0;

    const homelessPop = game.population-game.sheltered;
    const homelessChildrens = Math.round(game.childrens*homelessRate);

    let homelessDeathChance = 5;

    if(game.season == "winter"){homelessDeathChance *= 2}
    if(game.season == "summer"){homelessDeathChance *= 1.4}

    if(game.weather == "rain"){homelessDeathChance *= 1.4}
    if(game.weather == "snow"){homelessDeathChance *= 2}
    
    homelessDeathChance = Math.round(homelessDeathChance);

    let popDeath = Math.round((rand(0,homelessDeathChance)/100)*homelessPop);
    let childrenDeath = Math.round((rand(0,homelessDeathChance*2)/100)*homelessChildrens);

    game.population -= popDeath;
    game.childrens -= childrenDeath;

    if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem abrigo");
    if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem abrigo");
    if(childrenDeath > 1)      logPush(childrenDeath+" crianças morreram sem abrigo");
    if(childrenDeath == 1)     logPush(childrenDeath+" criança morreu sem abrigo");

    //Without Outerwear Deaths #############################################################################

    if(season == "winter"){
        let popWithoutClothes = Math.round(game.population-game.clothes);
        if(popWithoutClothes < 0)
        popWithoutClothes = 0;

        let childrensWithoutOuterwear = 0;
        if(popWithoutClothes > 0)
            childrensWithoutOuterwear = Math.round((popWithoutClothes/game.population)*game.childrens);
        if(!childrensWithoutOuterwear) childrensWithoutOuterwear = 0;

        popDeath = Math.round((rand(0,25)/100)*popWithoutClothes);
        childrenDeath = Math.round((rand(0,50)/100)*childrensWithoutOuterwear);

        game.population -= popDeath;
        game.childrens -= childrenDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem agasalho");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem agasalho");
        if(childrenDeath > 1)      logPush(childrenDeath+" crianças morreram sem agasalho");
        if(childrenDeath == 1)     logPush(childrenDeath+" criança morreu sem agasalho");
    }
    game.clothes_balance -= (game.population*0.0125)+(game.childrens*0.00625);

    //HUNGRY ######################################################################################
    const foodConsumption = (game.population*0.05) + (game.childrens*0.0250);
    game.food_balance -= foodConsumption;

    if(game.food < foodConsumption)
        game.hungry++;
    else
        game.hungry = 0;
    if(game.hungry < 0)  game.hungry = 0;
    if(game.hungry > 0){
        game.food_lack = true;

        popDeath = rand(0,game.hungry);
        childrenDeath = rand(0,game.hungry);
        
        game.population -= popDeath;
        game.childrens -= childrenDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram de fome");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu de fome");
        if(childrenDeath > 1)      logPush(childrenDeath+" crianças morreram de fome");
        if(childrenDeath == 1)     logPush(childrenDeath+" criança morreu de fome");

        if(game.population < 0) game.population = 0;
        if(game.childrens < 0) game.childrens = 0;
    }

    //Resource Calc ###############################################################################

    game.food += game.food_balance;
    game.crop += game.crop_balance;
    game.leather += game.leather_balance;
    game.wood += game.wood_balance;
    game.firewood += game.firewood_balance;
    game.stone += game.stone_balance;
    game.iron += game.iron_balance;
    game.tools += game.tools_balance;
    game.clothes += game.clothes_balance;

    if(game.food < 0) game.food = 0;
    if(game.leather < 0) game.leather = 0;
    if(game.wood < 0) game.wood = 0;
    if(game.firewood < 0) game.firewood = 0;
    if(game.stone < 0) game.stone = 0;
    if(game.iron < 0) game.iron = 0;
    if(game.clothes < 0) game.clothes = 0;
    if(game.tools < 0) game.tools = 0;

    if(game.food > game.resourceLimit)        game.food = game.resourceLimit;
    if(game.wood > game.resourceLimit)        game.wood = game.resourceLimit;
    if(game.stone > game.resourceLimit)       game.stone = game.resourceLimit;
    if(game.iron > game.resourceLimit)        game.iron = game.resourceLimit;
    if(game.firewood > game.resourceLimit)    game.firewood = game.resourceLimit;
    if(game.tools > game.resourceLimit)       game.tools = game.resourceLimit;
    if(game.clothes > game.resourceLimit)     game.clothes = game.resourceLimit;
    if(game.leather > game.resourceLimit)     game.leather = game.resourceLimit;

    //#############################################################################################

    if(game.population > game.popRecord) game.popRecord = game.population;

    updateDataInfo();
}