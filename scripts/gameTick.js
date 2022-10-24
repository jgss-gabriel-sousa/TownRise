import { game } from "./gameData.js";
import { logPush } from "./ui/log.js";
import { buildingsUpdate } from "./buildings.js";
import { rand, average } from "./funcs.js";
import { updateDataInfo } from "./ui/ui.js";
import { resources } from "./resourcesData.js";
import { PopulationUpdate } from "./population.js";

export function gameTick(){
    // RESET RESOURCES BALANCES
    for(let i = 0; i < resources.length; i++){
        game[resources[i].id+"_balance"] = 0;
        game[resources[i].id+"_lack"] = false;
    }
    game.sheltered = 0;

    //PRODUCTIVITY ################################################################################

    let toolsAccess = game.tools/game.population;
    if(game.tools == 0) toolsAccess = 0;
    if(toolsAccess > 1) toolsAccess = 1;
    if(toolsAccess < 1) game.tools_lack = true;

    let toolsPopConsumption;
    if(game.gameDifficulty == "hard")       toolsPopConsumption = 1.5/(game.seasonLength*4); // 1.5 por Ano
    if(game.gameDifficulty == "normal")     toolsPopConsumption = 1/(game.seasonLength*4); // 1 por Ano
    if(game.gameDifficulty == "easy")       toolsPopConsumption = 0.5/(game.seasonLength*4); // 0.5 por Ano

    game.tools_balance -= game.population*toolsPopConsumption;

    const seasonProductivity = game.season == "winter" ? 0.5 : 1;

    game.productivity = average([toolsAccess,game.happiness,game.health,seasonProductivity]);

    if(game.productivity > 1) game.productivity = 1;
    
    if(game.gameDifficulty == "normal" && game.productivity < 0.25) game.productivity = 0.25;
    if(game.gameDifficulty == "easy" && game.productivity < 0.5) game.productivity = 0.5;

    //Updates #####################################################################################

    buildingsUpdate();
    PopulationUpdate();

    //Resource Calc ###############################################################################

    for(let i = 0; i < resources.length; i++){
        //Add to Resource Count the Balance
        game[resources[i].id] += game[resources[i].id+"_balance"];

        //If Resource Count < 0 set to 0
        if(game[resources[i].id] < 0)
            game[resources[i].id] = 0;

        //If Resource Count > Resource Limit set to Resource Limit
        if(game[resources[i].id] > game.resourceLimit)
            game[resources[i].id] = game.resourceLimit;
    }

    //#############################################################################################

    if(game.population > game.popRecord) game.popRecord = game.population;

    updateDataInfo();
}