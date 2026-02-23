const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");

search.addEventListener("keyup", () => {
  let value = search.value.toLowerCase();
  cards.forEach(card=>{
    card.style.display = card.dataset.name.includes(value) ? "block" : "none";
  });
});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker Registered"));
}