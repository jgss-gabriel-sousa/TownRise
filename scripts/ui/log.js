import {game} from "../../data/gameData.js"
import { numberF } from "../funcs.js"

const MAX_LOG_SIZE = 100;

export function logPush(msg){
    const logSize = document.getElementById("log").childNodes.length;

    if(logSize >= MAX_LOG_SIZE){
        document.getElementById("log").childNodes[logSize-1].remove();
    }

    document.getElementById("log").innerHTML = `<p>Dia ${numberF(game.totalDays-1,"",0)}: ${msg}</p>`+document.getElementById("log").innerHTML;
}
