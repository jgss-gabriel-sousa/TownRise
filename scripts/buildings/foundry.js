import { game } from "../gameData.js"

export function foundry(){
    const firewood_consumption = game.foundry*0.25;
    const iron_consumption = game.foundry*0.25;

    //###########################################
    
    let jobSupply = game.blacksmith/game.blacksmith_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(firewoodSupply < 1) game.firewood_lack = true;
    if(!firewoodSupply) firewoodSupply = 0;

    let ironSupply = game.iron/iron_consumption;
    if(ironSupply > 1) ironSupply = 1;
    if(ironSupply < 1) game.iron_lack = true;
    if(!ironSupply) ironSupply = 0;

    const productivity = jobSupply*firewoodSupply*ironSupply*game.productivity;
    
    game.tools_balance += (game.foundry)*productivity;

    //###########################################
    game.firewood_balance -= firewood_consumption*productivity;
    game.iron_balance -= iron_consumption*productivity;
}