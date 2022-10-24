import { game } from "../gameData.js"

export function idle(difficulty){
    game.grain_balance -= game.idle*0.5 * (2.5 / 120)*difficulty;
    game.fruit_balance -= game.idle*0.5 * (1 / 120)*difficulty;
    game.meat_balance -= game.idle*0.5 * (0.75 / 120)*difficulty;
}