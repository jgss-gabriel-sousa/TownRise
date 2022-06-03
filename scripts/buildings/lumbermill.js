import { game } from "../gameData.js"

export function lumbermill(){
    game.wood_balance += (game.lumbermill*1)*game.productivity;
}