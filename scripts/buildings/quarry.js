import { game } from "../gameData.js"

export function quarry(){
    game.stone_balance += (game.quarry)*game.productivity;
}