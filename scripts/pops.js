import { game } from "./gameData.js"
import { popsData } from "../data/popsData.js"

let difficulty;

export function popsUpdate(diff){
    difficulty = diff;

    goodsConsumption();
}

function goodsConsumption(){

    for(const p in popsData) {
        const evt = popsData[p];

        if(popsData[p].hasOwnProperty("consumption")) {
            for(const goods in popsData[p].consumption) {
                if(game.hasOwnProperty(goods+"_balance")) {
                    const popCons = popsData[p].consumption[goods]*difficulty;

                    game[goods+"_balance"] -= popCons;
                }
            }
        }
    }
}