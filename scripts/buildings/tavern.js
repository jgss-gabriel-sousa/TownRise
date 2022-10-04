import { game } from "../gameData.js"

export function tavern(){
    const grain_consumption = game.tavern*1;
    
    //###########################################
    
    let jobSupply = (game.brewer/game.brewer_jobs)*(game.worker/game.worker_jobs);
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let grainSupply = game.grain/grain_consumption;
    if(grainSupply > 1) grainSupply = 1;
    if(grainSupply < 1) game.grain_lack = true;
    if(!grainSupply) grainSupply = 0;

    const productivity = jobSupply*grainSupply*game.productivity;

    game.ale_balance += (game.tavern)*productivity;

    //###########################################
    game.grain_balance -= grain_consumption*productivity;
}