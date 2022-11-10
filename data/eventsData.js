import { game } from "../data/gameData.js";

export const eventsData = {
    plague: {
        rareness: 1000*game.health,
        title: "Praga",
        image: true,
        message: `
            <label>Uma praga virulenta abateu-se sobre a nossa população.</label>
            <hr>
            <ul style="text-align:start;">
            Efeitos (durante 90 dias):
                <li>+200% de Mortalidade</li>
            </ul>
        `,
        onTrigger: () => {
            console.log("plague triggered");
        },
        duration: 90,
        modifier: () => {
            game.impacts.popDeath *= 4;
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
                <li>+40% de Produtividade das Plantações</li>
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
            game.impacts.popGrowth *= 1.2;
            game.impacts.happiness *= 1.2;
            game.impacts.cropFieldProductivity *= 1.4;
        },
        duration: 30,
    },
}