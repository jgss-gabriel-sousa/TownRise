import { game } from "../../data/gameData.js"

export function cropField(){    
    let jobSupply = game.farmer/game.farmer_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################

    let weatherProductivity = 1;

    if(game.weather == "rain") weatherProductivity *= 4;
    if(game.season == "winter") weatherProductivity *= 0;

    const productivity = jobSupply*game.productivity*weatherProductivity*game.impacts.cropFieldProductivity;
    
    game.grain_balance += (game.cropField*1.5)*productivity;
}

