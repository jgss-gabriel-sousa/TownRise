export const game = {
    villageName: "",
    gameTick: 0,
    gameStarted: false,
    gamePaused: true,
    gameOver: false,
    gameSurrender: false,
    destroyBuildingCheck: false,

    gameDifficulty: "normal",
    gameSpeed: 1000,
    seasonLength: 90,
    score: 0,

    modifiers:{},
    activeEvents:{},

    impacts: {
        popGrowth: 1,
        popDeath: 1,
        happiness: 1,
        cropField_productivity: 1,
        orchard_productivity: 1,
    },

    population: 10,
    lastYear_population: 10,
    popRecord: 0,
    food: 999,
    food_consumption: 0,
    knowledge: 0,
    popLimit: 0,
    lifeQuality: 0,

    productivity: 0,
    happiness: 0.5,
    lifeQuality: 1,
    
    totalDays: 0,
    season: "spring",
    day: 0,
    year: 0,
    weather: "sun",
}