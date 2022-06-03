import { game } from "../gameData.js"

export function house(){
    const wood_consumption = game.house*0.25;
    const firewood_consumption = game.house*0.1;
    
    //###########################################
    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(!woodSupply) woodSupply = 0;

    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(game.season != "winter") firewoodSupply = 1;

    game.sheltered = Math.round((game.house*4)*firewoodSupply*woodSupply);

    if(game.sheltered > game.population) game.sheltered = game.population;
    if(!game.sheltered) game.sheltered = 0;

    //###########################################
    game.wood_balance -= wood_consumption;
    if(game.season == "winter")
        game.firewood_balance -= firewood_consumption;
}