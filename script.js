let pokemonLoad = [];
let offset = 0;
const limit = 20;




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

        // Details aller Pokémon parallel laden
        const details = await Promise.all(results.map(p => fetch(p.url).then(res => res.json())));
        pokemonLoad.push(...details);

        // Typen parallel laden
        const typesArray = await Promise.all(details.map(d => getPokemonTypes(d.name)));

        // HTML generieren
        details.forEach((d, i) => {
            document.getElementById("pokemonContainer").innerHTML += `
                <div class="pokemon-card">
                    <h3>${capitalizeFirstLetter(d.name)}</h3>
                    <img src="${d.sprites.front_default}" alt="${d.name}">
                    <p>Typ: ${typesArray[i].join(', ')}</p>
                </div>
            `;
        });

        offset += limit;
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
}


async function loadmorePokemon() {

    offset = offset + 20;
    await loadPokemon();

}

async function getPokemonTypes(pokemontyp) {
    try {
        const response = await fetch(`${API_BASE_URL}${pokemontyp.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon nicht gefunden");
        const data = await response.json();
        return data.types.map(t => capitalizeFirstLetter(t.type.name));
    } catch (error) {
        console.error(error);
        return [];
    }
}