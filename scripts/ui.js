export function buildingsUI(){
    const menuDiv = document.getElementById("buildings-menu");
    let actualButtonRow = 0;
    let buttonRow = "<div>";

    for(let i = 0; i < buildingsButtons.length; i++) {
        const element = buildingsButtons[i];
        let button;

        if(element.buttonRow > actualButtonRow){
            buttonRow += "</div>";
            menuDiv.innerHTML += buttonRow;

            buttonRow = "<div>";
            actualButtonRow = element.buttonRow;
        }

        button =`<button class="btn" id="add-${element.id}">${element.name}
                    <span class="tooltip">`

        if(element.build.length > 0)
            button += `<b>Construir</b><br>`
    
        for(let j = 0; j < element.build.length; j++){
            button += element.build[j]+"<br>";

            if(j+1 == element.build.length)
                button += "<br>"
        }

        if(element.needs.length > 0)
            button += `<b>Requer</b><br>`
    
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

const buildingsButtons = [
    {
        id: "house",
        name: "Casa",
        buttonRow: 0,
        build: [
            "1 de Mão de Obra",
            "1 Madeira"
        ],
        needs: [
            "1 Madeira / Ano"
        ],
        result: [
            "4 Abrigos"
        ]
    },
    {
        id: "farm",
        name: "Plantação",
        buttonRow: 10,
        build: [
            "Impossível no Inverno",
            "2 de Madeira"
        ],
        needs: [
        ],
        result: [
            "4 Empregos",
            "0.5 de Colheita"
        ]
    },
    {
        id: "lumbermill",
        name: "Serraria",
        buttonRow: 20,
        build: [
            "3 de Mão de Obra"
        ],
        needs: [
            "1 de Ferro / Ano"
        ],
        result: [
            "2 Empregos",
            "0.5 de Madeira"
        ]
    },
    {
        id: "builder",
        name: "Carpintaria",
        buttonRow: 20,
        build: [
            "3 de Mão de Obra",
            "3 de Madeira",
        ],
        needs: [
            "0.5 de Madeira / Mês",
            "0.5 de Pedra / Mês",
        ],
        result: [
            "3 Empregos",
            "6 de Mão de Obra"
        ]
    },
    {
        id: "warehouse",
        name: "Armazém",
        buttonRow: 30,
        build: [
            "6 de Mão de Obra",
            "10 de Madeira"
        ],
        needs: [
            "1 de Madeira / Mês"
        ],
        result: [
            "5 Empregos",
            "50 de Armazenamento"
        ]
    },
    {
        id: "quarry",
        name: "Pedreira",
        buttonRow: 40,
        build: [
            "20 de Mão de Obra",
            "20 de Madeira"
        ],
        needs: [
            "1 de Madeira / Mês"
        ],
        result: [
            "20 Empregos",
            "1 de Pedra"
        ]
    },
    {
        id: "mine",
        name: "Mina",
        buttonRow: 40,
        build: [
            "30 de Mão de Obra",
            "30 de Madeira",
            "30 de Pedra"
        ],
        needs: [
            "1 de Madeira / Mês"
        ],
        result: [
            "30 Empregos",
            "1 de Ferro"
        ]
    },
]