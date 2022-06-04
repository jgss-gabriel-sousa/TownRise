import { game } from "../gameData.js"

export function farm(){
    const wood_consumption = game.farm*0.5;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(woodSupply < 1) game.wood_lack = true;
    if(!woodSupply) woodSupply = 0;

    game.food_balance += (game.farm*0.5)*woodSupply*game.productivity;
    game.leather_balance += (game.farm*0.5)*woodSupply*game.productivity;

    //###########################################
    game.wood_balance -= wood_consumption;

    //###########################################
    game.jobs += game.farm*4;
}