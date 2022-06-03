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
            "0.05 Lenha (Inverno)"
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
            "40 Madeiras",
            "20 Pedras",
            "20 Ferros"
        ],
        needs: [
            "0.5 Lenha",
            "0.5 Pedra"
        ],
        result: [
            "4 Vagas de Estudante"
        ]
    },
    {
        id: "cropField",
        name: "Plantação",
        spriteSize: "md",
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
            "0.5 Madeira"
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
        spriteSize: "md",
        spritePlace: "city",
        buttonRow: 15,
        build: [
            "10 Madeiras"
        ],
        needs: [
            "1 Couro"
        ],
        result: [
            "3 Empregos",
            "1 Roupa"
        ]
    },
    {
        id: "blacksmith",
        name: "Ferreiro",
        spriteSize: "md",
        spritePlace: "city",
        buttonRow: 15,
        build: [
            "10 Pedras"
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
        id: "sawmill",
        name: "Serraria",
        spriteSize: "md",
        spritePlace: "manufactories",
        buttonRow: 20,
        build: [
            "20 Madeiras",
            "10 Pedras"
        ],
        needs: [
            "0.5 Madeira"
        ],
        result: [
            "5 Empregos",
            "0.25 Lenha"
        ]
    },
    {
        id: "warehouse",
        name: "Armazém",
        spriteSize: "lg",
        spritePlace: "manufactories",
        buttonRow: 30,
        build: [
            "50 Madeiras"
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
            "40 Madeiras"
        ],
        needs: [
        ],
        result: [
            "10 Empregos",
            "1 Pedra"
        ]
    },
    {
        id: "mine",
        name: "Mina",
        spriteSize: "lg",
        buttonRow: 40,
        spritePlace: "manufactories",
        build: [
            "40 Pedras"
        ],
        needs: [
        ],
        result: [
            "20 Empregos",
            "1 Ferro"
        ]
    },
]