import { game } from "../data/gameData.js";

export const eventsData = {
    plague: {
        rareness: 500*game.health,
        title: "Praga",
        image: true,
        message: `
            <label>Uma praga virulenta abateu-se sobre a nossa população.</label>
            <hr>
            <ul style="text-align:start;">
            Efeitos (durante 90 dias):
                <li>+100% de Mortalidade</li>
            </ul>
        `,
        onTrigger: () => {
            console.log("plague triggered");
        },
        duration: 90,
        modifier: () => {
            game.popDeathImpacts *= 2;
        },
    },

    spring_festival: {
        rareness: 2,
        title: "Festival da Primavera",
        image: true,
        message: `
            <label>Nossa população organizou uma bela celebração.</label>
            <hr>
            <ul style="text-align:start;">
            Efeitos (durante 30 dias):
                <li>+20% de Crescimento Populacional</li>
                <li>+20% de Felicidade</li>
            </ul>
            `,
        onTrigger: () => {
            console.log("spring_festival triggered");
        },
        condition: () => {
            if(game.season != "spring") return false;
            if(game.modifiers.hasOwnProperty("plague")) return false;
            if(game.modifiers.hasOwnProperty("plague")) return false;
            if(game.day%game.season < 3) return false;

            return true;
        },
        modifier: () => {
            game.popGrowthImpacts *= 1.2;
            game.happinessImpacts *= 1.2;
        },
        duration: 30,
    },
}