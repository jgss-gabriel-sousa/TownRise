export const buildingsData = {
    shack: {
        name: "Cabana",
        spriteSize: "sm",
        spritePlace: "city",
        description: "Habitação para 4 cidadãos",
        build: {
            wood: 4
        },
        maintenance: {
        },
        winter_needs: {
            firewood: 0.1
        },
        production: {
        },
        popLimit: 4,
    },
    house: {
        name: "Casa",
        spriteSize: "md",
        spritePlace: "city",
        description: "Habitação para 8 cidadãos",
        build: {
            wood: 6,
            stone: 12,
            iron: 2,
            planks: 2,
        },
        maintenance: {
        },
        winter_needs: {
            firewood: 0.05
        },
        production: {
        },
        popLimit: 8,
    },
    nobleHouse: {
        name: "Casa Nobre",
        spriteSize: "md",
        spritePlace: "city",
        description: "Habitação para 16 cidadãos",
        build: {
            wood: 6,
            stone: 24,
            iron: 4,
            planks: 8,
        },
        maintenance: {
        },
        winter_needs: {
            firewood: 0.02
        },
        production: {
        },
        popLimit: 16,
    },
    cropField: {
        name: "Plantação",
        spriteSize: "lg",
        spritePlace: "farms",
        description: "A produção é quadruplicada em dias chuvosos. Durante o Inverno, não há produção",
        jobs: {
            farmer: 6,
        },
        build: {
            wood: 10,
        },
        maintenance: {
        },
        production: {
            grain: 2,
        }
    },
    farm: {
        name: "Fazenda",
        spriteSize: "lg",
        spritePlace: "farms",
        description: "",
        jobs: {
            farmer: 4,
        },
        build: {
            wood: 10,
        },
        maintenance: {
            grain: 1
        },
        production: {
            meat: 0.5,
            leather: 0.25,
            milk: 1,
        }
    },
    orchard: {
        name: "Pomar",
        spriteSize: "lg",
        spritePlace: "farms",
        description: "Durante o Inverno, não há produção",
        jobs: {
            farmer: 4,
        },
        build: {
            wood: 10,
        },
        maintenance: {
        },
        production: {
            fruit: 1,
        }
    },
    mill: {
        name: "Moinho",
        spriteSize: "lg",
        spritePlace: "farms",
        description: "",
        jobs: {
            worker: 4,
        },
        build: {
            wood: 20,
            stone: 10,
            planks: 5,
        },
        maintenance: {
            grain: 4,
        },
        production: {
            flour: 3,
        }
    },
    dairy: {
        name: "Leitaria",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 2,
        },
        build: {
            wood: 20,
            stone: 10,
            planks: 10,
        },
        maintenance: {
            milk: 3,
        },
        production: {
            butter: 2.4,
            //cheese: 1.6,
        }
    },
    bakery: {
        name: "Padaria",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            worker: 2,
            artificer: 2,
        },
        build: {
            wood: 20,
            stone: 10,
            planks: 5,
        },
        maintenance: {
            flour: 4,
            butter: 2.5,
        },
        production: {
            bread: 8,
        }
    },
    tailorsmith: {
        name: "Alfaiate",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 3,
        },
        build: {
            wood: 10
        },
        maintenance: {
            leather: 1
        },
        production: {
            clothes: 1,
        }
    },
    foundry: {
        name: "Fundição",
        spriteSize: "md",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            worker: 3,
            artificer: 3,
        },
        build: {
            wood: 20,
            stone: 50
        },
        maintenance: {
            coal: 4,
            iron: 1,
        },
        production: {
            steel: 0.5
        }
    },
    blacksmith: {
        name: "Ferreiro",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 3,
        },
        build: {
            wood: 30,
            stone: 30
        },
        maintenance: {
            firewood: 6,
            iron: 0.5,
        },
        production: {
            tools: 1,
        }
    },
    armory: {
        name: "Armeiro",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 3,
        },
        build: {
            wood: 30,
            stone: 30
        },
        maintenance: {
            firewood: 6,
            planks: 3,
            steel: 2,
        },
        production: {
            weapon: 1,
        }
    },
    tavern: {
        name: "Taverna",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 1,
            worker: 3,
        },
        build: {
            wood: 12,
            planks: 10,
            stone: 6,
            iron: 4,
        },
        maintenance: {
            grain: 9,
            fruit: 4.5,
        },
        production: {
            ale: 3,
        }
    },
    lumbermill: {
        name: "Madeireira",
        spriteSize: "md",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            worker: 6,
        },
        build: {
        },
        maintenance: {
        },
        production: {
            wood: 2,
        }
    },
    sawmill: {
        name: "Serraria",
        spriteSize: "md",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            worker: 3,
        },
        build: {
        },
        maintenance: {
            wood: 1,
        },
        production: {
            firewood: 4,
            planks: 0.8,
        }
    },
    mine: {
        name: "Mina",
        spriteSize: "lg",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            miner: 30,
        },
        build: {
            wood: 50,
            planks: 20,
        },
        maintenance: {
        },
        production: {
            stone: 3,
            iron: 0.5,
        }
    },
    deepMine: {
        name: "Mina Profunda",
        spriteSize: "lg",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            miner: 30,
        },
        build: {
            wood: 120,
            planks: 48,
        },
        maintenance: {
        },
        production: {
            coal: 2,
            iron: 1.5,
        }
    },
    huntingCabin: {
        name: "Caçador",
        spriteSize: "sm",
        spritePlace: "manufactories",
        description: "",
        jobs: {
            worker: 4,
        },
        build: {
            wood: 15,
        },
        maintenance: {
        },
        production: {
            meat: 0.5,
            leather: 0.75
        }
    },
}