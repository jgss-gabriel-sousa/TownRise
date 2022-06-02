import { buildingsData } from "./buildings.js"

export function buildingsUI(){
    const menuDiv = document.getElementById("buildings-menu");
    let actualButtonRow = 0;
    let buttonRow = `<div class="buildings-btn">`;

    for(let i = 0; i < buildingsData.length; i++) {
        const element = buildingsData[i];
        let button;

        if(element.buttonRow > actualButtonRow){
            buttonRow += "</div>";
            menuDiv.innerHTML += buttonRow;

            buttonRow = `<div class="buildings-btn">`;
            actualButtonRow = element.buttonRow;
        }

        button =`<button class="btn" id="add-${element.id}">${element.name}
                    <span class="tooltip">`

        if(element.build.length > 0)
            button += `<b>Construção</b><br>`
    
        for(let j = 0; j < element.build.length; j++){
            button += element.build[j]+"<br>";

            if(j+1 == element.build.length)
                button += "<br>"
        }

        if(element.needs.length > 0)
            button += `<b>Manutenção</b><br>`
    
        for(let j = 0; j < element.needs.length; j++){
            button += element.needs[j]+"<br>";

            if(j+1 == element.needs.length)
                button += "<br>"
        }

        if(element.result.length > 0)
            button += `<b>Gera</b><br>`
        
        for(let j = 0; j < element.result.length; j++){
            button += element.result[j];
            
            if(j+1 != element.result.length)
                button += "<br>"
        }
        button += `</span></button>`;

        buttonRow += button;
    }
    buttonRow += "</div>";
    menuDiv.innerHTML += buttonRow;
}


export function resourcesUI(){
    const div = document.getElementById("resources");

    for(let i = 0; i < resources.length; i++){
        const r = resources[i];
        let button;
        
        if(!r.visibleFromStart)
            button = `<button class="resources-btn hidden" id="${r.id}">`
        else
        button = `<button class="resources-btn" id="${r.id}">`

        button += `
                <img src="./img/icons/${r.id}.png">
                <p>${r.name}</p>
                <p id="${r.id}-stat"></p>
            </button>
        `;

        div.innerHTML += button;
    }
}

const resources = [
    {
        id: "food",
        name: "Comida",
        visibleFromStart: true
    },
    {
        id: "crop",
        name: "Colheita",
        visibleFromStart: false
    },
    {
        id: "leather",
        name: "Couro",
        visibleFromStart: false
    },
    {
        id: "wood",
        name: "Madeira",
        visibleFromStart: true
    },
    {
        id: "firewood",
        name: "Lenha",
        visibleFromStart: true
    },
    {
        id: "stone",
        name: "Pedra",
        visibleFromStart: true
    },
    {
        id: "iron",
        name: "Ferro",
        visibleFromStart: false
    },
    {
        id: "coal",
        name: "Carvão",
        visibleFromStart: false
    },
    {
        id: "steel",
        name: "Aço",
        visibleFromStart: false
    },
    {
        id: "clothes",
        name: "Roupas",
        visibleFromStart: true
    },
    {
        id: "tools",
        name: "Ferramentas",
        visibleFromStart: true
    }
]