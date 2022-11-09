import { game } from "../../data/gameData.js"

export function sawmill(){
    const wood_consumption = game.sawmill*0.5;
    
    //###########################################
    
    let jobSupply = game.worker/game.worker_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(woodSupply < 1) game.wood_lack = true;
    if(!woodSupply) woodSupply = 0;

    const productivity = jobSupply*woodSupply*game.productivity;

    game.firewood_balance += (game.sawmill*0.25)*productivity;

    //###########################################
    game.wood_balance -= wood_consumption*productivity;
}