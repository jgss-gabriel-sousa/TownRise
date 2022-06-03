import { game } from "../gameData.js"

export function sawmill(){
    const wood_consumption = game.sawmill*0.5;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(!woodSupply) woodSupply = 0;

    game.firewood_balance += (game.sawmill*0.25)*woodSupply*game.productivity;

    //###########################################
    game.wood_balance -= wood_consumption;
}