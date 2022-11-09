import { game } from "../../data/gameData.js"

export function tailorsmith(){
    const leather_consumption = game.tailorsmith*1;
    
    //###########################################
    
    let jobSupply = game.artificer/game.artificer_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let leatherSupply = game.leather/leather_consumption;
    if(leatherSupply > 1) leatherSupply = 1;
    if(leatherSupply < 1) game.leather_lack = true;
    if(!leatherSupply) leatherSupply = 0;

    const productivity = jobSupply*leatherSupply*game.productivity;

    game.clothes_balance += (game.tailorsmith)*productivity;

    //###########################################
    game.leather_balance -= leather_consumption*productivity;
}