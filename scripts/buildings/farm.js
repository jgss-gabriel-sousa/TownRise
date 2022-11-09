import { game } from "../../data/gameData.js"

export function farm(){
    const wood_consumption = game.farm*0.5;

    //###########################################
    
    let jobSupply = game.farmer/game.farmer_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################

    let woodSupply = game.wood/wood_consumption;
    if(woodSupply > 1) woodSupply = 1;
    if(woodSupply < 1) game.wood_lack = true;
    if(!woodSupply) woodSupply = 0;

    const productivity = jobSupply*woodSupply*game.productivity;

    game.meat_balance += (game.farm*0.5)*productivity;
    game.leather_balance += (game.farm*0.5)*productivity;

    //###########################################
    game.wood_balance -= wood_consumption*productivity;
}