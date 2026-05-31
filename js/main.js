// Protezione: se gli elementi non esistono, termina
if (!menuBtn || !nav) return;

// Stato iniziale: su mobile il nav è nascosto (display:none nel CSS)
// Al click del pulsante, si alterna la visibilità del nav
menuBtn.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";

  // Aggiorna lo stato aria
  menuBtn.setAttribute("aria-expanded", String(!isOpen));

  // Mostra/nasconde il nav
  if (isOpen) {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
});

// Quando lo schermo diventa più grande (tablet o superiore),
// lo stile inline può causare problemi → quindi lo resettiamo
const mq = window.matchMedia("(min-width: 768px)");
const handleResize = () => {
  // Su tablet o schermi più grandi, il nav è gestito dal CSS → rimuovi lo stile inline
  if (mq.matches) {
    nav.style.display = "";
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    // Tornando al mobile, lo stato iniziale è chiuso
    nav.style.display = "none";
    menuBtn.setAttribute("aria-expanded", "false");
  }
};

// Esegui una volta all'inizio + rileva i cambiamenti di dimensione
handleResize();
mq.addEventListener("change", handleResize);

// Quando il menu è aperto e si clicca un link, chiudilo automaticamente (UX mobile)
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!mq.matches) {
      nav.style.display = "none";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});

