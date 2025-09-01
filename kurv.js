// Vent på at hele HTML-siden er indlæst
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Vælg de HTML-elementer, vi skal bruge ---
    const tilføjKnap = document.getElementById('add-to-cart-btn'); // Din "Tilføj til kurv" knap
    const kurvIkon = document.getElementById('cart-icon');         // Ikonet for kurven
    const kurvUI = document.getElementById('cart-ui');             // Selve kurv-containeren
    const lukKurvKnap = document.getElementById('close-cart-btn'); // Luk-knappen i kurven
    const kurvIndhold = document.querySelector('.cart-content');   // Området hvor produktet vises i kurven
    const kurvAntalIkon = document.getElementById('cart-counter');   // Tælleren på kurv-ikonet

    // --- 2. Variabel til at holde styr på, om produktet er i kurven ---
    let produktErIKurven = false;

    // --- 3. Funktioner ---

    // Funktion til at åbne kurven
    function åbenKurv() {
        kurvUI.classList.add('active');
    }

    // Funktion til at lukke kurven
    function lukKurv() {
        kurvUI.classList.remove('active');
    }
    
    // Funktion der tilføjer produktet til kurven
    function tilføjProduktTilKurv() {
        // Tjek først om produktet allerede ER tilføjet
        if (produktErIKurven) {
            alert("Produktet er allerede i kurven!");
            åbenKurv(); // Åben kurven for at vise dem det
            return; // Stop funktionen her
        }

        // Definer produktets information her
        const produkt = {
            titel: "Limona Top • sort str M",
            pris: "449,00 kr.", // Husk at skrive den korrekte pris
            billedeSrc: "img/limona-top.jpg" // VIGTIGT: Ret stien til dit produktbillede!
        };

        // Byg HTML-koden for produktet i kurven
        const vareHTML = `
            <div class="cart-box">
                <img src="${produkt.billedeSrc}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${produkt.titel}</div>
                    <div class="cart-price">${produkt.pris}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class='bx bxs-trash-alt cart-remove'></i>
            </div>`;

        // Indsæt HTML'en i kurven
        kurvIndhold.innerHTML = vareHTML;
        produktErIKurven = true; // Marker at produktet nu er i kurven

        // Opdater tæller og totalpris
        opdaterTotal();
        åbenKurv(); // Vis kurven
    }

    // Funktion der fjerner produktet (hvis man klikker på skraldespanden)
    function fjernProduktFraKurv() {
        kurvIndhold.innerHTML = '<p class="empty-cart-message">Kurven er tom.</p>'; // Vis "tom kurv" besked
        produktErIKurven = false; // Marker at produktet er fjernet
        opdaterTotal(); // Opdater tæller og totalpris
    }

    // Funktion til at opdatere totalpris og tæller
    function opdaterTotal() {
        if (produktErIKurven) {
            const prisTekst = kurvIndhold.querySelector('.cart-price').innerText;
            document.querySelector('.total-price').innerText = prisTekst;
            kurvAntalIkon.textContent = '1';
            kurvAntalIkon.style.display = 'block';
        } else {
            document.querySelector('.total-price').innerText = '0,00 kr.';
            kurvAntalIkon.style.display = 'none';
        }
    }

    // --- 4. Event Listeners (lytter efter klik) ---

    // Klik på "Tilføj til kurv" knappen
    tilføjKnap.addEventListener('click', tilføjProduktTilKurv);

    // Klik på kurv-ikonet åbner kurven
    kurvIkon.addEventListener('click', åbenKurv);

    // Klik på luk-knappen lukker kurven
    lukKurvKnap.addEventListener('click', lukKurv);

    // Klik på skraldespanden i kurven fjerner produktet
    kurvIndhold.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-remove')) {
            fjernProduktFraKurv();
        }
    });
});