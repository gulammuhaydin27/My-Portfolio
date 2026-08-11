const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 0 20px #8b5cf6";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
  });
});


