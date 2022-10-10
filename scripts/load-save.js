import { game } from "./gameData.js";
import { savedGamesHTML } from "./ui.js";

export async function saveGame(){
    if(game.villageName == ""){
        const { value: name } = await Swal.fire({
            title: "Dê um nome para a vila",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            input: "text",
            inputValidator: (value) => {
                if(!value) return "Digite um nome!";
            }
        });

        game.villageName = name;
    }

    let villagesBackup = JSON.parse(localStorage.getItem("saved-villages"));
    let villages = villagesBackup;

    if(villages != null){
        for(let i = 0; i < villages.length; i++){
            if(villages[i].villageName == game.villageName)
                villages.splice(i--, 1);
        }

        villages.push(game);
    }
    else
        villages = [game];
    
    try{
        if(!game.villageName) throw "error";

        localStorage.setItem("mv-saved-villages", JSON.stringify(villages));

        Swal.fire({
            icon: "success",
            title: "Salvo com sucesso!",
            showConfirmButton: false,
            timer: 1000
        });
    }catch(e){
        localStorage.setItem("mv-saved-villages", JSON.stringify(villagesBackup));
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Erro ao salvar"
        });
    }
}

export function loadGame(name){
    let villages = JSON.parse(localStorage.getItem("mv-saved-villages"));

    for(let i = 0; i < villages.length; i++){
        const element = villages[i];
        

        if(element.villageName == name){
            Object.keys(game).forEach((key, index) => {
                game[key] = element[key];
            });
        }
    }
}

export function deleteGame(name){
    let villages = JSON.parse(localStorage.getItem("mv-saved-villages"));
    let newVillages = [];

    for(let i = 0; i < villages.length; i++){
        if(villages[i].villageName != name)
            newVillages.push(villages[i]);
    }

    villages = newVillages;
    localStorage.setItem("mv-saved-villages", JSON.stringify(villages));

    savedGamesHTML();
}