import { game } from "../data/gameData.js"
import { popsData } from "../data/popsData.js"

let difficulty;

export function popsUpdate(diff){
    difficulty = diff;

    foodConsumption();

    goodsConsumption();
}

function foodConsumption(){
    let variation = 0;
    const foodItems = 5;

    let grain_csmpt = 0;
    let milk_csmpt = 0;
    let meat_csmpt = 0;
    let fruit_csmpt = 0;
    let bread_csmpt = 0;

    if(game.grain > 0){
        grain_csmpt = 0.25;
        variation += 1/foodItems;
    }else{
        game.grain_lack = true;
    }
    if(game.milk > 0){
        milk_csmpt = 0.25;
        variation += 1/foodItems;
    }else{
        game.milk_lack = true;
    }   
    if(game.meat > 0){
        meat_csmpt = 0.15;
        variation += 1/foodItems;
    }else{
        game.meat_lack = true;
    }   
    if(game.fruit > 0){
        fruit_csmpt = 0.1;
        variation += 1/foodItems;
    }else{
        game.fruit_lack = true;
    }  
    if(game.bread > 0){
        bread_csmpt = 0.25;
        variation += 1/foodItems;
    }else{
        game.bread_lack = true;
    }  

    if(variation == 0)
        variation = 0.0001;

    grain_csmpt /= variation;
    milk_csmpt /= variation;
    meat_csmpt /= variation;
    fruit_csmpt /= variation;
    bread_csmpt /= variation;

    for(const p in popsData){
        game.food_consumption += popsData[p].food_consumption*game[p]*difficulty;

        const baseCsmpt = (popsData[p].food_consumption*game[p]*difficulty)/variation;
        
        game.grain_balance -= baseCsmpt*grain_csmpt;
        game.milk_balance -= baseCsmpt*milk_csmpt;
        game.meat_balance -= baseCsmpt*meat_csmpt;
        game.fruit_balance -= baseCsmpt*fruit_csmpt;
        game.bread_balance -= baseCsmpt*bread_csmpt;
    }
}

function goodsConsumption(){
    for(const p in popsData) {
        const evt = popsData[p];

        if(popsData[p].hasOwnProperty("consumption")) {
            for(const goods in popsData[p].consumption) {
                if(game.hasOwnProperty(goods+"_balance")) {
                    const popCsmpt = popsData[p].consumption[goods]*game[p]*difficulty;
                    game[goods+"_balance"] -= popCsmpt;
                }
            }
        }
    }
}