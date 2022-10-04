import { game } from "../gameData.js"

export function cropField(){    
    let jobSupply = game.farmer/game.farmer_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################

    let weatherProductivity = 1;

    if(game.weather == "rain") weatherProductivity *= 4;

    const productivity = jobSupply*game.productivity*weatherProductivity;
    
    game.grain_balance += (game.cropField*0.5)*productivity;
}

