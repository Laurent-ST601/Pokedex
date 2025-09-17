const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#0835a0ff",
    grass: "#78C850",
    electric: "#F8D030",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
};

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("pokemonOverlay");
    const closeBtn = document.getElementById("closeOverlay");
    const overlayImage = document.getElementById("overlayImage");
    const overlayName = document.getElementById("overlayName");
    const overlayStats = document.getElementById("overlayStats");
    const prevBtn = document.getElementById("prevPokemon");
    const nextBtn = document.getElementById("nextPokemon");

    closeBtn.addEventListener("click", () => overlay.style.display = "none");

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });



// Pokémon Karte anklicken
document.getElementById("pokemonContainer").addEventListener("click", async (e) => {
    const card = e.target.closest(".pokemon-card");
    if (!card) return;

    const name = card.querySelector("h3").innerText.toLowerCase();
    currentIndex = pokemonLoad.findIndex(p => p.name === name);

    showPokemonOverlay(currentIndex);
});

// Buttons "Zurück" & "Weiter"
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showPokemonOverlay(currentIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < pokemonLoad.length - 1) {
        currentIndex++;
        showPokemonOverlay(currentIndex);
    }
});

function showPokemonOverlay(index) {
    const data = pokemonLoad[index];
    if (!data) return;

    overlayImage.src = data.sprites.front_default;
    overlayName.textContent = capitalizeFirstLetter(data.name);

    overlayStats.innerHTML = data.stats.map(s =>
        `<div class="stat"><span>${s.stat.name.toUpperCase()}</span><span>${s.base_stat}</span></div>`
    ).join('');

    const mainType = data.types[0].type.name;
    const mainColor = typeColors[mainType] || "#78C850";
    document.querySelector(".overlay-header").style.backgroundColor = mainColor;

    overlay.style.display = "flex";
}
});

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt().toUpperCase() + str.slice(1);
}
