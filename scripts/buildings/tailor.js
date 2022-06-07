import { game } from "../gameData.js"

export function tailor(){
    const leather_consumption = game.tailor*1;
    
    //###########################################
    
    game.tailor_jobs += game.tailor*3;
    
    let jobSupply = game.tailor_prof/game.tailor_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let leatherSupply = game.leather/leather_consumption;
    if(leatherSupply > 1) leatherSupply = 1;
    if(leatherSupply < 1) game.leather_lack = true;
    if(!leatherSupply) leatherSupply = 0;

    const productivity = jobSupply*leatherSupply*game.productivity;

    game.clothes_balance += (game.tailor)*productivity;

    //###########################################
    game.leather_balance -= leather_consumption*productivity;
}