import { eventsData } from "../../data/eventsData.js";
import { shuffleArr } from "../funcs.js";
import { game } from "../../data/gameData.js";
import { logPush } from "../ui/log.js";

export function advanceYear(){
    shuffleArr(eventsData);

    game.lastYear_population = game.population;
    game.year++;
}