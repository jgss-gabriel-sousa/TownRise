import { game } from "../../data/gameData.js"

export function mine(){    
    let jobSupply = game.miner/game.miner_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;

    //###########################################

    const productivity = jobSupply*game.productivity;

    game.iron_balance += (game.mine*1)*productivity;
}