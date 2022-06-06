import { average } from "../funcs.js"
import { game } from "../gameData.js"

export function house(){
    const firewood_consumption = game.house*0.1;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(firewoodSupply < 1) game.firewood_lack = true;
    if(game.season != "winter") firewoodSupply = 1;

    game.sheltered = Math.round((game.house*4)*average([firewoodSupply,woodSupply]));

    if(game.sheltered > game.population) game.sheltered = game.population;
    if(!game.sheltered) game.sheltered = 0;

    //###########################################
    
    if(game.season == "winter")
        game.firewood_balance -= firewood_consumption;
}