import { game } from "../data/gameData.js";

export function jobs(){
    game.worker_jobs = (game.warehouse*5)+ (game.tavern*2);
    game.farmer_jobs = (game.cropField*4)+(game.farm*4);
    game.lumberjack_jobs = (game.lumbermill*3)+(game.sawmill*3);
    game.tailor_jobs = (game.tailorsmith*3);
    game.academic_jobs = (game.school*4);
    game.blacksmith_jobs = (game.foundry*3);
    game.miner_jobs = (game.quarry*5)+(game.mine*5);
    game.brewer_jobs = (game.tavern);

    const totalJobs = game.worker_jobs+game.farmer_jobs+game.lumberjack_jobs+game.tailor_jobs+game.academic_jobs+game.blacksmith_jobs+game.miner_jobs+game.brewer_jobs;

    game.worker = game.worker_jobs;
    game.farmer = game.farmer_jobs;
    game.lumberjack = game.lumberjack_jobs;
    game.tailor = game.tailor_jobs;
    game.academic = game.academic_jobs;
    game.blacksmith = game.blacksmith_jobs;
    game.miner = game.miner_jobs;
    game.brewer = game.brewer_jobs;
    
    //game.farmer = Math.round((game.farmer_jobs/totalJobs)*game.population);
}