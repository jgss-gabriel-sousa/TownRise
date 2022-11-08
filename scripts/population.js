import { popsUpdate } from "./pops.js";
import { game } from "./gameData.js";
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
    if(rand(0,10) != 0) return;
    
    let popGrowth = rand(0,5)+((game.happiness/0.5) * game.popGrowthImpacts);
    popGrowth /= 100;
    
    popGrowth = Math.round(game.population * popGrowth);
    if(popGrowth < 1 && rand(0,4) == 0)
        popGrowth = 1;

    let popDeath = Math.round((game.population*(rand(0,3)/100))*game.popDeathImpacts);
    if(popDeath < 1 && rand(0,5) == 0)
        popDeath = 1;

    game.popGrowth = popGrowth/game.population;
    game.popDeath = popDeath/game.population;

    game.population = game.population + popGrowth - popDeath;

    if(popDeath > popGrowth){
        if(popDeath-popGrowth == 1) 
            logPush("1 pessoa morreu");
        else                        
            logPush((popDeath-popGrowth)+" pessoas morreram");
    }    
}

function popDeaths(){
    hungryDeaths();
    homelessDeaths();
    randDeaths();
    
    function hungryDeaths(){
        function popHungry(){
            game.hungry = 0;
        
            if(game.grain+game.grain_balance < 0){
                game.grain_lack = true;    
                game.hungry += 0.22;
            }
            else{
                game.grain_lack = false;    
                game.hungry -= 0.22;
            }
            if(game.fruit+game.fruit_balance < 0){
                game.fruit_lack = true;    
                game.hungry += 0.18;
            }
            else{
                game.fruit_lack = false;    
                game.hungry -= 0.18;
            }
            if(game.meat+game.meat_balance < 0){
                game.meat_lack = true;     
                game.hungry += 0.60;
            }
            else{
                game.meat_lack = false;    
                game.hungry -= 0.60;
            }
        }popHungry();
        
        if(game.hungry > 0){
            let popDeath = rand(0, Math.ceil(game.hungry * game.population));
    
            game.population -= popDeath;
    
            if(popDeath > 1)        logPush(popDeath+" pessoas morreram de fome");
            if(popDeath == 1)       logPush(popDeath+" pessoa morreu de fome");
    
            if(!game.population)    game.population = 0;
        }
    }

    function homelessDeaths(){
        let homelessRate = 1;
        if(game.population)
            homelessRate = (game.population - game.sheltered)/game.population;
            
        if(!homelessRate || homelessRate < 0) homelessRate = 0;

        const homelessPops = game.population-game.sheltered;

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
        let childrenDeath = 0;

        if(popDeath){
            popDeath = Math.ceil((rand(0,homelessDeathChance)/100)*homelessPops);
        }

        game.population -= popDeath;

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem abrigo");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem abrigo");
    }

    function randDeaths(){
        const randDeathChance = 1;

        if(rand(0, 1000) < randDeathChance){
            game.population--;

            const randDead = rand(0,2);
            const baseMsg = "1 pessoa morreu ";
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

        if(popDeath > 1)        logPush(popDeath+" pessoas morreram sem agasalho");
        if(popDeath == 1)       logPush(popDeath+" pessoa morreu sem agasalho");
        if(childrenDeath > 1)   logPush(childrenDeath+" crianças morreram sem agasalho");
        if(childrenDeath == 1)  logPush(childrenDeath+" criança morreu sem agasalho");
    }
    game.clothes_balance -= (game.population*0.0125)+(game.childrens*0.00625);
*/