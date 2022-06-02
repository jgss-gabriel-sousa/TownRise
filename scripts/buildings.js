import { rand } from "./funcs.js";

export function buildingHTML(id){
    const city = document.getElementById("map-city");
    const farms = document.getElementById("map-farms");
    const manufactories = document.getElementById("map-manufactories");

    let exists = false;

    buildingsData.forEach(element => {
        if(element.id == id){
            exists = true;

            let buildingHTML = `<div class="map-item map-item-${element.spriteSize} map-${element.spritePlace} map-${element.id}">
                                    <img src="./img/${element.id}.png">
                                </div>`;

            if(element.spritePlace == "city")           city.innerHTML += buildingHTML;
            if(element.spritePlace == "farms")          farms.innerHTML += buildingHTML;
            if(element.spritePlace == "manufactories")  manufactories.innerHTML += buildingHTML;
        }
    });

    if(exists)
        return true;
    else
        return false;
}

export function destroyBuildingHTML(id, qty){
    const elements = document.querySelectorAll(".map-"+id);

    if(qty > elements.length) qty = elements.length;

    for(let i = 0; i < qty; i++){
        elements[i].remove();
    }
}

export const buildingsData = [
    {
        id: "house",
        name: "Casa",
        spriteSize: "sm",
        spritePlace: "city",
        buttonRow: 0,
        build: [
            "5 Madeiras",
            "2 Pedras",
        ],
        needs: [
            "0.25 Madeira",
            "0.1 Lenha (Inverno)"
        ],
        result: [
            "4 Abrigos"
        ]
    },
    {
        id: "school",
        name: "Escola",
        spriteSize: "md",
        spritePlace: "city",
        buttonRow: 5,
        build: [
            "50 Madeiras",
            "20 Pedras",
            "20 Ferros"
        ],
        needs: [
            "1 Papel",
            "0.5 Pedra"
        ],
        result: [
            "4 Vagas de Estudante"
        ]
    },
    {
        id: "cropField",
        name: "Plantação",
        spriteSize: "sm",
        spritePlace: "farms",
        buttonRow: 10,
        build: [
        ],
        needs: [
        ],
        result: [
            "4 Empregos",
            "0.5 Colheita"
        ]
    },
    {
        id: "farm",
        name: "Fazenda",
        spriteSize: "md",
        spritePlace: "farms",
        buttonRow: 10,
        build: [
            "10 Madeiras"
        ],
        needs: [
            "0.25 Madeira"
        ],
        result: [
            "8 Empregos",
            "1 de Comida",
            "0.5 de Couro",
        ]
    },
    {
        id: "tailor",
        name: "Alfaiate",
        spriteSize: "sm",
        spritePlace: "city",
        buttonRow: 15,
        build: [
            "30 de Madeiras"
        ],
        needs: [
            "1 Couro",
            "0.1 Ferramenta"
        ],
        result: [
            "3 Empregos",
            "1 Roupa"
        ]
    },
    {
        id: "blacksmith",
        name: "Ferreiro",
        spriteSize: "sm",
        spritePlace: "city",
        buttonRow: 15,
        build: [
            "30 de Pedras"
        ],
        needs: [
            "0.25 Lenha",
            "0.25 Ferro"
        ],
        result: [
            "3 Empregos",
            "1 Ferramenta"
        ]
    },
    {
        id: "lumbermill",
        name: "Madeireira",
        spriteSize: "md",
        spritePlace: "manufactories",
        buttonRow: 20,
        build: [
        ],
        needs: [
        ],
        result: [
            "5 Empregos",
            "1 Madeira"
        ]
    },
    {
        id: "sawnmill",
        name: "Serraria",
        spriteSize: "md",
        spritePlace: "manufactories",
        buttonRow: 20,
        build: [
            "20 Madeiras",
            "20 Pedras"
        ],
        needs: [
            "0.25 Ferro"
        ],
        result: [
            "5 Empregos",
            "0.5 Lenha"
        ]
    },
    {
        id: "warehouse",
        name: "Armazém",
        spriteSize: "md",
        spritePlace: "manufactories",
        buttonRow: 30,
        build: [
            "40 Madeiras"
        ],
        needs: [
            "1 Madeira"
        ],
        result: [
            "5 Empregos",
            "50 Armazenamento"
        ]
    },
    {
        id: "quarry",
        name: "Pedreira",
        spriteSize: "lg",
        spritePlace: "manufactories",
        buttonRow: 40,
        build: [
            "50 Madeiras"
        ],
        needs: [
            "0.1 Ferramentas"
        ],
        result: [
            "10 Empregos",
            "1 Pedras"
        ]
    },
    {
        id: "mine",
        name: "Mina",
        spriteSize: "lg",
        buttonRow: 40,
        spritePlace: "manufactories",
        build: [
            "40 Madeiras",
            "70 Pedras"
        ],
        needs: [
            "0.5 Ferramentas"
        ],
        result: [
            "20 Empregos",
            "1 Ferro"
        ]
    },
]