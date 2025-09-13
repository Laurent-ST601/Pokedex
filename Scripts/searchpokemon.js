function filterPokemonByName(pokemon) {
    const search = document.getElementById("filterpokemon").value.toLowerCase().trim();
    return search.length < 3 || pokemon.name.toLowerCase().includes(search);
}

function filterListPkn() {
    const container = document.getElementById("pokemonContainer");
    container.innerHTML = "";
    const search = document.getElementById("filterpokemon").value.toLowerCase().trim();
    let pokemonToDisplay = [];

    if (search.length < 3) {
        pokemonToDisplay = pokemonLoad;
    } else {
        pokemonToDisplay = pokemonLoad.filter(p => p.name.toLowerCase().includes(search));
    }
    pokemonToDisplay.forEach(p => {
        const types = p.types.map(t => t.type.name);
        const typeBadges = types.map(type => `<span class="type-badge ${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`).join("");

        container.innerHTML += `
      <div class="pokemon-card">
        <h3>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
        <img src="${p.sprites.front_default}" alt="${p.name}">
        <div class="types">${typeBadges}</div>
      </div>`;
    });
}