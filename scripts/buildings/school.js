import { game } from "../gameData.js"

export function school(){
    const firewood_consumption = game.school*0.5;
    const stone_consumption = game.school*0.5;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(!firewoodSupply) firewoodSupply = 0;

    let stoneSupply = game.stone/stone_consumption;
    if(stoneSupply > 1) stoneSupply = 1;
    if(!stoneSupply) stoneSupply = 0;

    game.educatedLimit = (game.school*4)*firewoodSupply*stoneSupply;

    //###########################################
    game.firewood_balance -= firewood_consumption;
    game.stone_balance -= stone_consumption;
}