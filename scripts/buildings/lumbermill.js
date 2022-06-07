import { game } from "../gameData.js"

export function lumbermill(){
    game.lumberjack_jobs += game.lumbermill*3;
    
    let jobSupply = game.lumberjack/game.lumberjack_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;

    //###########################################

    const productivity = jobSupply*game.productivity;

    game.wood_balance += (game.lumbermill*1)*productivity;
}