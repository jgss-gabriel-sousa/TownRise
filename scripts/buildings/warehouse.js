import { game } from "../gameData.js"

export function warehouse(){
    const wood_consumption = game.warehouse*1;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(woodSupply < 1) game.wood_lack = true;
    if(!woodSupply) woodSupply = 0;

    game.resourceLimit = ((1+game.warehouse)*game.warehouseStorage)*woodSupply;

    if(game.resourceLimit < 50) game.resourceLimit = 50;

    //###########################################
    game.wood_balance -= wood_consumption;

    //###########################################
    game.jobs += game.warehouse*5;
}