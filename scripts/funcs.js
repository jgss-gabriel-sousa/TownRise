export function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffleArr(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function numberFormatted(number){
    number = number.toString().replace(".", ",");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function numberF(number,format,precision){
    if(format == "balance") return balance(number,precision);
    
    if(precision == 0)
        return numberFormatted(Math.round(number));
    else
        return numberFormatted(number.toFixed(2));
}

function balance(number,precision){
    let value;
    if(precision < 0){
        if(number < 10)     value = number.toFixed(1);
        else if(number < 1) value = number.toFixed(2);
    }
    else{
        value = number.toFixed(precision);
    }
    
    if(number >= 100)
        value = Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    if(value > 0)
        value = "+"+value;
    
    return value;
}

export function resourceBalanceNumberFormat(number){
    let value;
    if(number < 10){
        value = number.toFixed(1);
    }
    else if(number < 1){
        value = number.toFixed(2);
    }
    else{
        value = Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    if(value > 0)
        value = "+"+value;
    
    return value;
}

export function numberBalanceFormatted(number){
    let value;
    if(number < 10){
        value = number.toFixed(1);
    }
    else{
        value = Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    if(value > 0)
        value = "+"+value;
    
    return value;
}

export function translateSeason(season){
    if(season == "spring")  return "Primavera";
    if(season == "summer")  return "Verão";
    if(season == "autumn")  return "Outono";
    if(season == "winter")  return "Inverno";
}

export function average(array){
    let total = 0;
    let count = 0;

    array.forEach(function(item, index) {
        total += item;
        count++;
    });

    return total / count;
}

if(localStorage.getItem("mv-game-version") != document.getElementById("game-version").innerText){
    localStorage.setItem("mv-highscore", "0");
    localStorage.setItem("mv-game-version", document.getElementById("game-version").innerText);
}

let highscore = localStorage.getItem("mv-highscore");
if(highscore == null) highscore = 0;


export function highScoreHTML(){
    document.getElementById("highscore").innerText = "Recorde: "+highscore;
}

export function checkHighScore(value){
    if(value > highscore){
        localStorage.setItem("mv-highscore", value.toString());
    }
}