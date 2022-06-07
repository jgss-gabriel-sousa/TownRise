import { game } from "../gameData.js"

export function warehouse(){
    const wood_consumption = game.warehouse*1;
    
    //###########################################
    
    game.worker_jobs += game.warehouse*5;
    
    let jobSupply = game.worker/game.worker_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(woodSupply < 1) game.wood_lack = true;
    if(!woodSupply) woodSupply = 0;

    const productivity = jobSupply*woodSupply;

    game.resourceLimit = ((1+game.warehouse)*game.warehouseStorage)*productivity;

    if(game.resourceLimit < 50) game.resourceLimit = 50;

    //###########################################
    game.wood_balance -= wood_consumption*productivity;
}