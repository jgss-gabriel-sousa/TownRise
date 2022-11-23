import { popsUpdate } from "./pops.js";
import { game } from "../data/gameData.js";
import { rand } from "./funcs.js";
import { logPush } from "./ui/log.js";

export function populationUpdate(){
    let difficulty;

    if(game.gameDifficulty == "hard")       difficulty = 1;
    if(game.gameDifficulty == "normal")     difficulty = 0.75;
    if(game.gameDifficulty == "easy")       difficulty = 0.5;

    popsUpdate(difficulty);
    popGrowth();
    popDeaths();
}

export function popGrowth(){        
    if(rand(0,5) != 0) return;
    
    let popGrowth = rand(0,5)+((game.lifeQuality/0.5));
    popGrowth /= 100;
    
    popGrowth = Math.round((game.population * popGrowth)*game.impacts.popGrowth);
    if(popGrowth < 1 && rand(0,Math.round(4/game.impacts.popGrowth)) == 0)
        popGrowth = 1;

    let popDeath = Math.round((game.population*(rand(0,5)/100))*game.impacts.popDeath)
    if(popDeath > game.population)
        popDeath = game.population;
    popDeath = rand(0,popDeath+1);

    game.popGrowth = popGrowth/game.population;
    game.popDeath = popDeath/game.population;

    const oldPop = game.population;
    game.population = game.population + popGrowth - popDeath;
    if(game.population > oldPop && game.population > game.popLimit) game.population = oldPop;

    if(popDeath > popGrowth){
        if(popDeath-popGrowth == 1) 
            logPush("1 cidadão morreu");
        else                        
            logPush((popDeath-popGrowth)+" cidadãos morreram");
    }    
}

function popDeaths(){
    hungryDeaths();
    homelessDeaths();
    withoutClothesDeaths();
    //randDeaths();
    
    function hungryDeaths(){
        const hungry = (game.food_consumption - game.food)/game.food_consumption;
        
        if(hungry > 0){
            let popDeath = rand(1, Math.ceil(hungry * game.population));
    
            game.population -= popDeath;
    
            if(popDeath > 1)        logPush(popDeath+" cidadãos morreram de fome");
            if(popDeath == 1)       logPush(popDeath+" cidadão morreu de fome");
    
            if(!game.population)    game.population = 0;
        }
    }

    function homelessDeaths(){
        let homelessRate = 1;
        if(game.population)
            homelessRate = (1/(game.popLimit/game.population))-1;
        if(!homelessRate || homelessRate < 0) homelessRate = 0;

        const homelessPops = game.population-game.popLimit;

        let homelessDeathChance;
        if(game.gameDifficulty == "hard")   homelessDeathChance = 5;
        if(game.gameDifficulty == "normal") homelessDeathChance = 2.5;
        if(game.gameDifficulty == "easy")   homelessDeathChance = 1.25;

        if(game.season == "winter") homelessDeathChance *= 2
        if(game.season == "summer") homelessDeathChance *= 1.4

        if(game.weather == "rain")  homelessDeathChance *= 1.4
        if(game.weather == "snow")  homelessDeathChance *= 2

        if(game.clothes < game.population){
            const MAX_CLOTHES_DEATH_CHANCE = 2;
            
            let clothesLack = game.clothes/game.population;
            let clothesLackDeathChance = 1/clothesLack;
            if(clothesLackDeathChance > MAX_CLOTHES_DEATH_CHANCE) clothesLackDeathChance = 2;

            homelessDeathChance *= clothesLackDeathChance;

            game.clothes_lack = true;
        }
        
        homelessDeathChance = Math.round(homelessDeathChance);

        let popDeath = rand(0,100) < homelessDeathChance;

        if(popDeath){
            popDeath = Math.ceil((rand(0,homelessDeathChance)/100)*homelessPops);
        }

        game.population -= popDeath;

        if(popDeath > 1)        logPush(popDeath+" cidadãos morreram sem abrigo");
        if(popDeath == 1)       logPush(popDeath+" cidadão morreu sem abrigo");
    }

    function withoutClothesDeaths(){
        let popWithoutClothes = game.population - Math.floor(game.clothes);
        if(popWithoutClothes > 1) game.clothes_lack = true;

        let deathChance = 25;
        if(game.season == "winter") deathChance *= 4;
        
        let popDeath = Math.round((rand(0,deathChance)/100)*popWithoutClothes);

        if(popDeath < 0) popDeath = 0;

        game.population -= popDeath;
    }

    function randDeaths(){
        const randDeathChance = 1;

        if(rand(0, 1000) < randDeathChance){
            game.population--;

            const randDead = rand(0,2);
            const baseMsg = "1 cidadão morreu ";
            if(randDead == 0) logPush(baseMsg+"de tanto rir");
            if(randDead == 1) logPush(baseMsg+"tentado voar, pulando de um penhasco");
        }
    }
}

//OLD Pop Death
/*
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

        if(popDeath > 1)        logPush(popDeath+" cidadãos morreram sem agasalho");
        if(popDeath == 1)       logPush(popDeath+" cidadão morreu sem agasalho");
        if(childrenDeath > 1)   logPush(childrenDeath+" crianças morreram sem agasalho");
        if(childrenDeath == 1)  logPush(childrenDeath+" criança morreu sem agasalho");
    }
    game.clothes_balance -= (game.population*0.0125)+(game.childrens*0.00625);
*/