import { buildingsData } from "./buildingsData.js";
import { buildBuilding } from "./buildings.js";
import { newTurn } from "./game.js";
import { game } from "./gameData.js";

window.onclick = e => {
    //Build Constructions
    for(let i = 0; i < buildingsData.length; i++){
        const r = buildingsData[i];
        
        if(e.target.id == "add-"+r.id){
            buildBuilding(r.id);
        }
    }

    if(e.target.id == "start"){
        newTurn();
        game.gameStarted = true;
        game.gamePaused = false;
        document.getElementById("start-game").style.display = "none";
        document.getElementById("game-version").remove();
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("buildings-menu").classList.remove("hidden");
        document.getElementById("pause").classList.remove("hidden");
        document.getElementById("1x").classList.remove("hidden");
        document.getElementById("5x").classList.remove("hidden");
        document.getElementById("10x").classList.remove("hidden");
        document.getElementById("left-interface").style.display = "block";
        document.getElementById("right-section").style.display = "flex";
    } 
    else if(e.target.id == "restart"){
        document.location.reload(true);
    }
    else if(e.target.id == "pause"){
        clearTimeout(game.gameTick);
        game.gamePaused = true;
        document.getElementById("pause").classList.add("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    } 
    else if(e.target.id == "1x"){
        clearTimeout(game.gameTick);
        game.gamePaused = false;
        game.gameSpeed = 2000;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.add("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }
    else if(e.target.id == "5x"){
        clearTimeout(game.gameTick);
        game.gamePaused = false;
        game.gameSpeed = 400;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.add("btn-active");
        document.getElementById("10x").classList.remove("btn-active");
    }    
    else if(e.target.id == "10x"){
        clearTimeout(game.gameTick);
        game.gamePaused = false;
        game.gameSpeed = 200;
        newTurn();
        document.getElementById("pause").classList.remove("btn-active");
        document.getElementById("1x").classList.remove("btn-active");
        document.getElementById("5x").classList.remove("btn-active");
        document.getElementById("10x").classList.add("btn-active");
    }   
}