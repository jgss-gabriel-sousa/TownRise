import { game } from "../gameData.js"

export function blacksmith(){
    const firewood_consumption = game.blacksmith*0.25;
    const iron_consumption = game.blacksmith*0.25;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(!firewoodSupply) firewoodSupply = 0;

    let ironSupply = game.iron/iron_consumption;
    if(ironSupply > 1) ironSupply = 1;
    if(!ironSupply) ironSupply = 0;

    game.tools_balance += (game.blacksmith)*firewoodSupply*ironSupply*game.productivity;

    //###########################################
    game.firewood_balance -= firewood_consumption;
    game.iron_balance -= iron_consumption;
}