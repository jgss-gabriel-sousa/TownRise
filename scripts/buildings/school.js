import { game } from "../gameData.js"

export function school(){
    const firewood_consumption = game.school*0.5;
    const stone_consumption = game.school*0.5;
    
    //###########################################
    
    game.teacher_jobs += game.school*2;
    
    let jobSupply = game.teacher/game.teacher_jobs;
    if(jobSupply > 1) jobSupply = 1;
    if(!jobSupply) jobSupply = 0;
    
    //###########################################
    let firewoodSupply = game.firewood/firewood_consumption;
    if(firewoodSupply > 1) firewoodSupply = 1;
    if(firewoodSupply < 1) game.firewood_lack = true;
    if(!firewoodSupply) firewoodSupply = 0;

    let stoneSupply = game.stone/stone_consumption;
    if(stoneSupply > 1) stoneSupply = 1;
    if(stoneSupply < 1) game.stone_lack = true;
    if(!stoneSupply) stoneSupply = 0;

    const productivity = jobSupply*firewoodSupply*stoneSupply;

    game.educatedLimit = (game.school*4)*productivity;

    //###########################################
    game.firewood_balance -= firewood_consumption*productivity;
    game.stone_balance -= stone_consumption*productivity;
}