import { game } from "../../data/gameData.js"

export function stoneHouse(){
    const firewood_consumption = game.stoneHouse*0.025;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(firewoodSupply < 1) game.firewood_lack = true;
    if(game.season != "winter") firewoodSupply = 1;

    game.sheltered += Math.round((game.stoneHouse*8)*firewoodSupply);

    if(game.sheltered > game.population) game.sheltered = game.population;
    if(!game.sheltered) game.sheltered = 0;

    //###########################################
    
    if(game.season == "winter")
        game.firewood_balance -= firewood_consumption;
}