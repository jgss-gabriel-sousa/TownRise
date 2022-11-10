import { game } from "../data/gameData.js";

export function jobs(){
    game.worker_jobs = (game.warehouse*5)+(game.tavern*2)+(game.quarry*5)+(game.mine*5)+(game.lumbermill*3)+(game.sawmill*3);
    game.farmer_jobs = (game.cropField*4)+(game.farm*4);
    game.academic_jobs = (game.school*4);
    game.artificer_jobs = (game.tavern)+(game.foundry*3)+(game.tailorsmith*3);
}