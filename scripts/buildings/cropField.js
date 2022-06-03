import { game } from "../gameData.js"

export function cropField(){
    let weatherProductivity = 1;

    if(game.weather == "rain") weatherProductivity = 4;
    
    game.crop_balance += (game.cropField*0.5)*game.productivity*weatherProductivity;
}

