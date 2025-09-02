const str = ["XS","S","M","L","XL"];

let valgtStr = null;

function vælgStr (size){
    switch(size) {
        case 'XS':
            valgtStr = "XS";
            break;
        case 'S':
            valgtStr = "S";
            break;
        case "M":
            valgtStr = "M";
            break;
        case "L":
            valgtStr = "L";
            break;
        case "XL":
            valgtStr = "XL";
            break;
        default:
            valgtStr = null;
    }

for (let i = 0; i < str.length; i++) {
    let knap = document.querySelector('[data-size="' + str[i] + '"]')
    aktivKnap.classList.remove("is-active");
}

let aktivKnap = document.querySelector('[data-size="' + valgtStr + '"]')
if (aktivKnap) {
    aktivKnap.classList.add("is-active");
}

let feedback = document.getElementById("feedback");
feedback.textContent = "Du har valgt størrelse:" + valgtStr;
}

function tilføjTilKurv() {
    let feedback = document.getElementById("feedback");

    if(valgtStr === null){
        feedback.textContent = "Vælg venligst en størrelse!"
    } else {
        feedback.textContent = "Lagt i kurv: Str. " + valgtStr;
    }
}
