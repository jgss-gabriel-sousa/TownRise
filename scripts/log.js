import {game} from "./gameData.js"

const MAX_LOG_SIZE = 5;

export function logPush(msg){
    const logSize = document.getElementById("log").childNodes.length;

    if(logSize >= MAX_LOG_SIZE){
        document.getElementById("log").childNodes[logSize-1].remove();
    }

    document.getElementById("log").innerHTML = `<p>Dia ${game.totalDays-1}: ${msg}</p>`+document.getElementById("log").innerHTML;
}
