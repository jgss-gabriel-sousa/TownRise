export function rand(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function numberFormatted(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function translateSeason(season){
    if(season == "spring")  return "Primavera";
    if(season == "summer")  return "Verão";
    if(season == "autumn")  return "Outono";
    if(season == "winter")  return "Inverno";
}
