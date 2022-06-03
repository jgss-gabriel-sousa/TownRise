import { game } from "../gameData.js"

export function mine(){    
    game.iron_balance += (game.mine)*game.productivity;
}