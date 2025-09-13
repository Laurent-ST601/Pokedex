let pokemonLoad = [];
let pokemontypes = [];
let offset = 0;
const limit = 24;




function init() {
    loadPokemon();
}


function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadPokemon() {
    try {
        const listResponse = await fetch(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
        const { results } = await listResponse.json();
        const details = await Promise.all(results.map(p => fetch(p.url).then(res => res.json())));
        pokemonLoad.push(...details);
        details.forEach(d => {
            const typeBadges = d.types.map(t =>
                `<span class="type-badge ${t.type.name}">${capitalizeFirstLetter(t.type.name)}</span>`
            ).join('');
            document.getElementById("pokemonContainer").innerHTML += `
                <div class="pokemon-card">
                    <h3>${capitalizeFirstLetter(d.name)}</h3>
                    <img src="${d.sprites.front_default}" alt="${d.name}">
                    <div class="types">${typeBadges}</div>
                </div>`;
        });
        offset += limit;
    } catch (e) { console.error("Fehler beim Laden:", e); }
}


async function loadmorePokemon() {
    showSpinner(); 
    offset = offset + 20; 
    await loadPokemon();
    hideSpinner(); 
}

details.forEach(d => {
    const types = d.types.map(t => capitalizeFirstLetter(t.type.name));
    const typeBadges = types.map(type =>
        `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
    ).join('');

    document.getElementById("pokemonContainer").innerHTML += `
        <div class="pokemon-card">
            <h3>${capitalizeFirstLetter(d.name)}</h3>
            <img src="${d.sprites.front_default}" alt="${d.name}">
            <div class="types">${typeBadges}</div>
        </div>`;
});

