//Caroline
console.log("The file is working!")

//liste over mulige størrelser
const str = ["XS","S","M","L","XL"];

//der er ingen default størrlse, derfor er variablen "null"
let valgtStr = null;

//registerer, hvilken størrelse, der vælges, og tildeler variblen den værdi
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

//looper gennem alle størrelser, og fjerner "is-active" --> kan kun vælge én størrelse
for (let i = 0; i < str.length; i++) {
    let knap = document.querySelector('[data-size="' + str[i] + '"]')
    if (knap) knap.classList.remove("is-active");
}

//Den valgte størrelse tildeles class "is-active", og får en fed border (css)
let aktivKnap = document.querySelector('[data-size="' + valgtStr + '"]')
if (aktivKnap) aktivKnap.classList.add("is-active");

//når man har valgt en størrelse får man feedback om, hvilken størrelse, man har valgt (besked med grøn tekst)
let feedback = document.getElementById("feedback");
feedback.textContent = "Du har valgt størrelse:" + valgtStr;
feedback.style.color = "green";
}

//Når man trykker "tilføj til kurv" får man feedback alt efter, om man har valgt en størrelse eller ej
function tilføjTilKurv() {
    let feedback = document.getElementById("feedback");

    if(valgtStr === null){
        feedback.textContent = "Vælg venligst en størrelse!"
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Lagt i kurv: Str. " + valgtStr;
    }
}

//fortæller, at for alle elementer med .size gælder, at når der trykkes på knappen, registreres tilsvarende data-size (størrelse)
document.querySelectorAll(".size").forEach(knap => {
    knap.addEventListener("click", () => {
        vælgStr(knap.getAttribute("data-size"));
    });
});

//Når man trykker "tilføj til kurv" kaldes 'tilføjTilKurv' funktionen, som viser feedback
document.getElementById("add-to-cart").addEventListener("click", tilføjTilKurv);