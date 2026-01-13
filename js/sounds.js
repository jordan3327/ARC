// Usaremos una función para cargar los sonidos y asegurar que se activen
const hoverSound = new Audio('assets/sounds/hover.mp3');
const selectSound = new Audio('assets/sounds/select.mp3');

// Bandera para saber si el audio ya fue activado por el usuario
let audioContextActivated = false;

const activateAudio = () => {
    if (audioContextActivated) return;
    
    // Reproducimos un silencio para "despertar" el motor de audio en tablets/móviles
    hoverSound.play().then(() => {
        hoverSound.pause();
        hoverSound.currentTime = 0;
        audioContextActivated = true;
        console.log("Audio activado correctamente");
    }).catch(e => console.log("Esperando interacción..."));
};

// Escuchar el primer toque en cualquier lugar para activar el sonido
window.addEventListener('click', activateAudio, { once: true });
window.addEventListener('touchstart', activateAudio, { once: true });

function playEffect(type) {
    if (!audioContextActivated) return;

    let soundToPlay = (type === 'hover') ? hoverSound : selectSound;
    
    // Clonar para permitir sonidos rápidos superpuestos
    let clone = soundToPlay.cloneNode();
    clone.volume = (type === 'hover') ? 0.2 : 0.4;
    clone.play().catch(err => console.error("Error al reproducir:", err));
}

// Vinculamos a tus elementos del HTML
document.addEventListener('DOMContentLoaded', () => {
    // --- CAMBIO AQUÍ: Eliminamos '.offer-card' ---
    // Ahora solo selecciona los botones de acción y redes sociales
    const targets = document.querySelectorAll('.cta-button, .buy-button, .socials a');
    
    targets.forEach(btn => {
        btn.addEventListener('mouseenter', () => playEffect('hover'));
        btn.addEventListener('click', () => playEffect('select'));
        
        // En tablets, el primer toque en el botón hará el 'hover'
        btn.addEventListener('touchstart', () => playEffect('hover'), {passive: true});
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const button = document.getElementById("accept-cookies");

    // Si el usuario no ha aceptado antes, mostramos el aviso
    if (!localStorage.getItem("cookiesAceptadas")) {
        setTimeout(() => {
            banner.classList.add("active");
        }, 2000); // Aparece 2 segundos después de cargar
    }

    button.addEventListener("click", () => {
        banner.classList.remove("active");
        localStorage.setItem("cookiesAceptadas", "true");
    });
});

/* --- Lógica del Cartel de Cookies --- */
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const button = document.getElementById("accept-cookies");

    // Si el usuario NO ha aceptado las cookies antes
    if (!localStorage.getItem("cookiesAceptadas")) {
        // Esperamos 2 segundos para que no interrumpa la carga inicial
        setTimeout(() => {
            if (banner) {
                banner.classList.add("active");
            }
        }, 2000);
    }

    // Al hacer clic en el botón Accept
    if (button) {
        button.addEventListener("click", () => {
            banner.classList.remove("active");
            // Guardamos la decisión para que no vuelva a salir
            localStorage.setItem("cookiesAceptadas", "true");
        });
    }
});

// Ejemplo de cómo usar la preferencia guardada:
function reproducirSonidoTrade() {
    const quiereSonido = localStorage.getItem("pref_vfx"); // Recordamos lo que eligió en cookies.html

    if (quiereSonido === "true") {
        // Aquí va tu código para reproducir el sonido
        audio.play();
    } else {
        console.log("El usuario desactivó los sonidos desde el panel de cookies.");
    }
}