import { game } from "../../data/gameData.js";

export function advanceYear(){
    game.lastYear_population = game.population;
    game.year++;
}