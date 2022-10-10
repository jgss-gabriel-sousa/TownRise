import { buildingsData } from "./buildingsData.js";
import { buildBuilding, buildingsBootstrap } from "./buildings.js";
import { newTurn, checkGameOver } from "./game.js";
import { game } from "./gameData.js";
import { popBootstrap } from "./pop.js";
import { updateDataInfo } from "./ui.js";
import { deleteGame, loadGame, saveGame } from "./load-save.js";

window.onclick = e => {
    //Build Constructions
    for(let i = 0; i < buildingsData.length; i++){
        const r = buildingsData[i];
        
        if(e.target.id == "add-"+r.id){
            buildBuilding(r.id);
        }
    }

    if(e.target.id == "load-village"){
        document.getElementById("load-game").classList.add("hidden");
        loadGame(document.getElementById("village-to-load").value);
        startSequence("load-game");
    } 
    if(e.target.id == "delete-village"){
        Swal.fire({
            title: "Deseja mesmo Deletar?",
            icon: "warning",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Deletar",
            cancelButtonText: "Voltar",
        }).then((result) => {
            if(result.isConfirmed){
                deleteGame(document.getElementById("village-to-load").value);
            }
        });
    } 
    if(e.target.id == "surrender"){
        Swal.fire({
            title: "Deseja mesmo Desistir?",
            icon: "warning",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Desistir",
            cancelButtonText: "Voltar",
        }).then((result) => {
            if(result.isConfirmed){
                game.gameOver = true;
                game.gameSurrender = true;
                checkGameOver();
            }
        });
    }
    if(e.target.id == "start"){
        startSequence("new-game");
    } 
    if(e.target.id == "load"){
        document.getElementById("start-game").classList.add("hidden");
        document.getElementById("load-game").classList.remove("hidden");
    } 
    if(e.target.id == "back-to-start"){
        document.getElementById("start-game").classList.remove("hidden");
        document.getElementById("load-game").classList.add("hidden");
    } 
    if(e.target.id == "restart"){
        document.location.reload(true);
    }
    if(e.target.id == "pause"){
        clearTimeout(game.gameTick);
        game.gamePaused = true;
        speedBtnsClassReset();
        document.getElementById("pause").classList.add("btn-active");
    } 
    if(e.target.id == "1x"){
        setGameSpeed("1x");
    }
    if(e.target.id == "5x"){
        setGameSpeed("5x");
    }    
    if(e.target.id == "10x"){
        setGameSpeed("10x");
    }    
    if(e.target.id == "save-game"){
        saveGame();
    }   

    if(e.target.classList.contains("professions-slider")){
        updateDataInfo();
    }
}

document.querySelector("#volume input").addEventListener("change", () => {
    localStorage.setItem("mv-volume", document.querySelector("#volume input").value);
});


function speedBtnsClassReset(){
    document.getElementById("pause").classList.remove("btn-active");
    document.getElementById("1x").classList.remove("btn-active");
    document.getElementById("5x").classList.remove("btn-active");
    document.getElementById("10x").classList.remove("btn-active");
}

async function startSequence(type){
    if(type == "new-game")
        await selectGameDifficulty();
    setGameSpeed("1x");
    popBootstrap();
    buildingsBootstrap();
    game.gameStarted = true;
    game.gamePaused = false;
    document.getElementById("start-game").classList.add("hidden");
    document.getElementById("game-version").remove();
    document.getElementById("1x").classList.add("btn-active");
    document.getElementById("buildings-menu").classList.remove("hidden");
    document.getElementById("pause").classList.remove("hidden");
    document.getElementById("1x").classList.remove("hidden");
    document.getElementById("5x").classList.remove("hidden");
    document.getElementById("10x").classList.remove("hidden");
    document.getElementById("left-section").style.display = "flex";
    document.getElementById("middle-section").style.display = "flex";
    document.getElementById("right-section").style.display = "flex";
}

function setGameSpeed(speed){
    if(speed == "1x")       game.gameSpeed = 3000;
    if(speed == "5x")       game.gameSpeed = 500;
    if(speed == "10x")      game.gameSpeed = 100;

    clearTimeout(game.gameTick);
    game.gamePaused = false;
    newTurn();
    speedBtnsClassReset();
    document.getElementById(speed).classList.add("btn-active");
}

async function selectGameDifficulty(){
    const inputOptions = new Promise((resolve) => {
        resolve({
            "easy": "Fácil",
            "normal": "Normal",
            "hard": "Difícil"
        })
    })
    
    const { value: difficulty } = await Swal.fire({
        title: "Dificuldade:",
        input: "radio",
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if(!value) return "Escolha uma dificuldade!";
        }
    });
    
    if(difficulty == "easy")    game.gameDifficulty = "easy";
    if(difficulty == "normal")  game.gameDifficulty = "normal";
    if(difficulty == "hard")    game.gameDifficulty = "hard";
}