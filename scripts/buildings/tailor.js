import { game } from "../gameData.js"

export function tailor(){
    const leather_consumption = game.tailor*1;
    
    //###########################################
    let leatherSupply = game.leather/leather_consumption;
    if(leatherSupply > 1) leatherSupply = 1;
    if(!leatherSupply) leatherSupply = 0;

    game.clothes_balance += (game.tailor)*leatherSupply*game.productivity;

    //###########################################
    game.leather_balance -= leather_consumption;
}