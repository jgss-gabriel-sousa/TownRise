export const buildingsData = {
    shack: {
        name: "Cabana",
        spriteSize: "sm",
        spritePlace: "city",
        description: "Habitação para 4 cidadãos",
        build: {
            wood: 4
        },
        everyday_needs: {
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
        everyday_needs: {
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
        everyday_needs: {
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
        description: "A produção é quadruplicada em dias chuvosos. Já durante o inverno, não há produção",
        jobs: {
            farmer: 4,
        },
        build: {
            wood: 10,
        },
        everyday_needs: {
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
        everyday_needs: {
            grain: 1
        },
        production: {
            meat: 2,
            leather: 0.25
        }
    },
    orchard: {
        name: "Pomar",
        spriteSize: "lg",
        spritePlace: "farms",
        description: "",
        jobs: {
            farmer: 4,
        },
        build: {
            wood: 10,
        },
        everyday_needs: {
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
        everyday_needs: {
            grain: 4,
        },
        production: {
            flour: 1,
        }
    },
    bakery: {
        name: "Padaria",
        spriteSize: "md",
        spritePlace: "manufactories",
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
        everyday_needs: {
            flour: 6,
        },
        production: {
            bread: 4,
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
        everyday_needs: {
            leather: 1
        },
        production: {
            clothes: 1,
        }
    },
    foundry: {
        name: "Fundição",
        spriteSize: "md",
        spritePlace: "city",
        description: "",
        jobs: {
            artificer: 3,
        },
        build: {
            wood: 10,
            stone: 10
        },
        everyday_needs: {
            firewood: 6,
            iron: 0.75,
        },
        production: {
            tools: 1,
            //steel: 0.5
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
        everyday_needs: {
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
        everyday_needs: {
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
        everyday_needs: {
            wood: 4,
        },
        production: {
            firewood: 8,
            planks: 2,
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
            wood: 30,
            planks: 20,
        },
        everyday_needs: {
        },
        production: {
            stone: 4,
            iron: 3,
        }
    },
}