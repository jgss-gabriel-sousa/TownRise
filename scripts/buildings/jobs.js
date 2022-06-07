import { game } from "../gameData.js";

export function jobs(){
    game.worker_jobs = (game.warehouse*5);
    game.farmer_jobs = (game.cropField*4);
    game.herdsman_jobs = (game.farm*4);
    game.lumberjack_jobs = (game.lumbermill*3)+(game.sawmill*3);
    game.tailor_jobs = (game.tailor*3);
    game.teacher_jobs = (game.school*2);
    game.blacksmith_jobs = (game.blacksmith*3);
    game.miner_jobs = (game.quarry*5)+(game.mine*5);
}