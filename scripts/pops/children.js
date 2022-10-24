import { game } from "../gameData.js"

export function children(difficulty){
    game.grain_balance -= game.childrens*0.25 * (2.5 / 120)*difficulty;
    game.fruit_balance -= game.childrens*0.25 * (1 / 120)*difficulty;
    game.meat_balance -= game.childrens*0.25 * (0.75 / 120)*difficulty;
}