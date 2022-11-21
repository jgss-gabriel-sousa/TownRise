import { buildingsData } from "../../data/buildingsData.js";
import { game } from "../../data/gameData.js"

export function homes(){
    shack();
    house();
    nobleHouse();
}

function shack(){
    let firewoodSupply = 1;
    if(game.season == "winter" && game.firewood_lack) firewoodSupply = 0.25;

    game.popLimit += buildingsData["shack"].popLimit * game["shack"] * firewoodSupply;
}

function house(){
    let firewoodSupply = 1;
    if(game.season == "winter" && game.firewood_lack) firewoodSupply = 0.5;

    game.popLimit += buildingsData["house"].popLimit * game["house"] * firewoodSupply;
}

function nobleHouse(){
    let firewoodSupply = 1;
    if(game.season == "winter" && game.firewood_lack) firewoodSupply = 0.75;

    game.popLimit += buildingsData["nobleHouse"].popLimit * game["nobleHouse"] * firewoodSupply;
}