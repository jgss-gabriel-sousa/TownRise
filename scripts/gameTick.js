import { game } from "./gameData.js";
import { logPush } from "./log.js";
import { buildingsUpdate } from "./buildings.js";
import { rand, average } from "./funcs.js";
import { updateDataInfo } from "./ui.js";
import { resources } from "./resourcesData.js";
import { PopulationUpdate } from "./population.js";

export function gameTick(){
    // RESET RESOURCES BALANCES
    for(let i = 0; i < resources.length; i++){
        game[resources[i].id+"_balance"] = 0;
        game[resources[i].id+"_lack"] = false;
    }
    game.sheltered = 0;

    //PRODUCTIVITY ################################################################################

    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;
    if(toolsAccess < 1) game.tools_lack = true;

    let toolsPopConsumption;
    if(game.gameDifficulty == "hard")       toolsPopConsumption = 1.5/(game.seasonLength*4); // 1.5 por Ano
    if(game.gameDifficulty == "normal")     toolsPopConsumption = 1/(game.seasonLength*4); // 1 por Ano
    if(game.gameDifficulty == "easy")       toolsPopConsumption = 0.5/(game.seasonLength*4); // 0.5 por Ano

    game.tools_balance -= game.population*toolsPopConsumption;

    const seasonProductivity = game.season == "winter" ? 0.5 : 1;

    game.productivity = average([toolsAccess,game.happiness,game.health,seasonProductivity]);

    if(game.productivity > 1) game.productivity = 1;
    
    if(game.gameDifficulty == "normal" && game.productivity < 0.25) game.productivity = 0.25;
    if(game.gameDifficulty == "easy" && game.productivity < 0.5) game.productivity = 0.5;

    //Updates #####################################################################################

    buildingsUpdate();
    PopulationUpdate();
    
    //Homeless Deaths #############################################################################
    
    let homelessRate = 1;
    if(game.population)
        homelessRate = (game.population - game.sheltered)/game.population;
    else
        homelessRate = 0;
    if(!homelessRate || homelessRate < 0) homelessRate = 0;

    const homelessPop = game.population-game.sheltered;
    const homelessChildrens = Math.round(game.childrens*homelessRate);

    let homelessDeathChance;
    if(game.gameDifficulty == "hard")       homelessDeathChance = 10;
    if(game.gameDifficulty == "normal")     homelessDeathChance = 5;
    if(game.gameDifficulty == "easy")       homelessDeathChance = 2.5;

    if(game.season == "winter"){homelessDeathChance *= 2}
    if(game.season == "summer"){homelessDeathChance *= 1.4}

    if(game.weather == "rain"){homelessDeathChance *= 1.4}
    if(game.weather == "snow"){homelessDeathChance *= 2}

    if(game.clothes < game.population){homelessDeathChance *= 2; game.clothes_lack=true}
    
    homelessDeathChance = Math.round(homelessDeathChance);

    let popDeath = rand(0,100) < homelessDeathChance;
    let childrenDeath = 0;

    if(popDeath){
        popDeath = Math.ceil((rand(0,homelessDeathChance)/100)*homelessPop);
        childrenDeath = Math.ceil((rand(0,homelessDeathChance*2)/100)*homelessChildrens);
    }

    game.population -= popDeath;
    game.childrens -= childrenDeath;

    if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem abrigo");
    if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem abrigo");
    if(childrenDeath > 1)   logPush(childrenDeath+" crianças morreram sem abrigo");
    if(childrenDeath == 1)  logPush(childrenDeath+" criança morreu sem abrigo");

    //Without Outerwear Deaths #############################################################################

    if(season == "winter"){
        let popWithoutClothes = Math.round(game.population-game.clothes);
        if(popWithoutClothes < 0) popWithoutClothes = 0;
        if(popWithoutClothes > 0) clothes_lack = true;

        let childrensWithoutOuterwear = 0;
        if(popWithoutClothes > 0)
            childrensWithoutOuterwear = Math.round((popWithoutClothes/game.population)*game.childrens);
        if(!childrensWithoutOuterwear) childrensWithoutOuterwear = 0;
        if(!childrensWithoutOuterwear || childrensWithoutOuterwear < 0) childrensWithoutOuterwear = 0;

        popDeath = Math.round((rand(0,25)/100)*popWithoutClothes);
        childrenDeath = Math.round((rand(0,50)/100)*childrensWithoutOuterwear);

        game.population -= popDeath;
        game.childrens -= childrenDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem agasalho");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem agasalho");
        if(childrenDeath > 1)   logPush(childrenDeath+" crianças morreram sem agasalho");
        if(childrenDeath == 1)  logPush(childrenDeath+" criança morreu sem agasalho");
    }
    game.clothes_balance -= (game.population*0.0125)+(game.childrens*0.00625);

    //HUNGRY ######################################################################################
    if(game.hungry > 0){
        popDeath = rand(0,Math.ceil(game.hungry) > game.population ? game.population : Math.ceil(game.hungry));
        childrenDeath = rand(0,Math.ceil(game.hungry) > game.childrens ? game.childrens : Math.ceil(game.hungry));
        
        console.log(Math.ceil(game.hungry));
        console.log(popDeath);

        game.population -= popDeath;
        game.childrens -= childrenDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram de fome");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu de fome");
        if(childrenDeath > 1)   logPush(childrenDeath+" crianças morreram de fome");
        if(childrenDeath == 1)  logPush(childrenDeath+" criança morreu de fome");

        if(!game.population)    game.population = 0;
        if(!game.childrens)     game.childrens = 0;
    }

    //Resource Calc ###############################################################################

    for(let i = 0; i < resources.length; i++){
        //Add to Resource Count the Balance
        game[resources[i].id] += game[resources[i].id+"_balance"];

        //If Resource Count < 0 set to 0
        if(game[resources[i].id] < 0)
            game[resources[i].id] = 0;

        //If Resource Count > Resource Limit set to Resource Limit
        if(game[resources[i].id] > game.resourceLimit)
            game[resources[i].id] = game.resourceLimit;
    }

    //#############################################################################################

    if(game.population > game.popRecord) game.popRecord = game.population;

    updateDataInfo();
}