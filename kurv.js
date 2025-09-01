// Vi venter med at køre koden, til hele HTML-siden er indlæst
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Vælg de vigtigste HTML-elementer ---
    const kurvIkon = document.querySelector('#cart-icon'); // Dit kurv-ikon
    const kurvUI = document.querySelector('#cart-ui'); // Selve kurven, der popper frem
    const lukKurvKnap = document.querySelector('#close-cart-btn'); // Knappen til at lukke kurven
    const produkterContainer = document.querySelector('.shop-content'); // Containeren med alle dine produkter
    const kurvIndhold = document.querySelector('.cart-content'); // Listen hvor varer i kurven vises
    const kurvAntalIkon = document.querySelector('#cart-counter'); // Tallet på kurv-ikonet

    // --- 2. Variabel til at holde styr på varerne i kurven ---
    // Vi bruger en simpel array til at gemme produkterne
    let kurv = [];

    // --- 3. Opsæt event listeners (det der lytter efter klik) ---

    // Åbn kurven når man klikker på kurv-ikonet
    kurvIkon.addEventListener('click', () => {
        kurvUI.classList.add('active');
    });

    // Luk kurven når man klikker på luk-knappen
    lukKurvKnap.addEventListener('click', () => {
        kurvUI.classList.remove('active');
    });

    // Lyt efter klik inde i produkt-containeren
    // Dette er mere effektivt end at sætte en listener på hver eneste knap
    produkterContainer.addEventListener('click', (event) => {
        // Vi tjekker, om det var en "add-cart" knap, der blev klikket på
        if (event.target.classList.contains('add-cart')) {
            const produktElement = event.target.closest('.product-box');
            tilføjTilKurv(produktElement);
        }
    });

    // Lyt efter klik inde i kurven (til at fjerne varer)
    kurvIndhold.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-remove')) {
            const produktElement = event.target.closest('.cart-box');
            fjernFraKurv(produktElement);
        }
    });


    // --- 4. Funktioner til at håndtere kurven ---

    /**
     * Tilføjer et produkt til kurven baseret på det klikkede HTML-element
     */
    function tilføjTilKurv(produktElement) {
        const titel = produktElement.querySelector('.product-title').innerText;
        const pris = produktElement.querySelector('.price').innerText;
        const billedeSrc = produktElement.querySelector('.product-img').src;

        // Tjek om varen allerede er i kurven
        const eksisterendeVare = kurv.find(vare => vare.titel === titel);
        if (eksisterendeVare) {
            alert('Denne vare er allerede tilføjet til kurven.');
            return; // Stop funktionen her
        }

        // Opret et objekt for den nye vare
        const nyVare = { titel, pris, billedeSrc, antal: 1 };
        
        // Tilføj den nye vare til vores 'kurv' array
        kurv.push(nyVare);

        // Opdater visningen af kurven
        opdaterKurvVisning();
        // Gør kurven synlig
        kurvUI.classList.add('active');
    }

    /**
     * Fjerner et produkt fra kurven
     */
    function fjernFraKurv(produktElement) {
        const titel = produktElement.querySelector('.cart-product-title').innerText;
        
        // Find og fjern varen fra 'kurv' arrayet
        kurv = kurv.filter(vare => vare.titel !== titel);

        // Opdater visningen af kurven
        opdaterKurvVisning();
    }


    /**
     * Opdaterer hele kurvens HTML baseret på indholdet af 'kurv' arrayet
     */
    function opdaterKurvVisning() {
        // Nulstil indholdet
        kurvIndhold.innerHTML = '';

        let totalPris = 0;

        // Gennemløb alle varer i kurven
        kurv.forEach(vare => {
            // Opret HTML for hver vare
            const vareHTML = `
                <div class="cart-box">
                    <img src="${vare.billedeSrc}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${vare.titel}</div>
                        <div class="cart-price">${vare.pris}</div>
                        <input type="number" value="${vare.antal}" class="cart-quantity">
                    </div>
                    <i class='bx bxs-trash-alt cart-remove'></i>
                </div>`;
            
            // Indsæt den nye HTML i kurven
            kurvIndhold.innerHTML += vareHTML;

            // Udregn totalpris
            // Vi fjerner "kr." og konverterer til et tal
            const prisSomTal = parseFloat(vare.pris.replace("kr.", "").replace(",", "."));
            totalPris += prisSomTal * vare.antal;
        });

        // Opdater totalprisen i HTML'en
        document.querySelector('.total-price').innerText = totalPris.toFixed(2).replace(".", ",") + ' kr.';

        // Opdater tælleren på kurv-ikonet
        const totalAntalVarer = kurv.reduce((sum, vare) => sum + vare.antal, 0);
        kurvAntalIkon.textContent = totalAntalVarer;
        
        // Vis eller skjul tælleren
        kurvAntalIkon.style.display = totalAntalVarer > 0 ? 'block' : 'none';
    }
});