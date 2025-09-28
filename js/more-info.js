const wolfeyTeam = [
    { id: 591, name: "Amoonguss", apiName: "amoonguss" },
    { id: 727, name: "Incineroar", apiName: "incineroar" },
    { id: 985, name: "Scream Tail", apiName: "scream-tail" },
    { id: 1007, name: "Koraidon", apiName: "koraidon" },
    { id: 987, name: "Flutter Mane", apiName: "flutter-mane" },
    { id: 576, name: "Gothitelle", apiName: "gothitelle" }
];

const selectorContainer = document.getElementById('pokemon-selector');
const displayContainer = document.getElementById('pokemon-details-display');

function renderSelectors() {
    const selectorHTML = wolfeyTeam.map(pokemon => {
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        return `
            <button class="selector-btn" data-pokemon-apiname="${pokemon.apiName}">
                <img src="${spriteUrl}" alt="Sprite de ${pokemon.name}">
                <span>${pokemon.name}</span>
            </button>
        `;
    }).join('');
    selectorContainer.innerHTML = selectorHTML;
}

async function fetchPokemonDetails(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        displayContainer.innerHTML = `<p class="error-text">Could not fetch data for ${pokemonName}. Please try again.</p>`;
    }
}

function displayPokemonDetails(data) {
    const types = data.types.map(typeInfo => `<span class="type-badge type-${typeInfo.type.name}">${typeInfo.type.name}</span>`).join('');
    
    const stats = data.stats.map(statInfo => `
        <div class="stat-row">
            <span class="stat-name">${statInfo.stat.name.replace('-', ' ')}</span>
            <span class="stat-value">${statInfo.base_stat}</span>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${Math.min(statInfo.base_stat, 200) / 2}%"></div>
            </div>
        </div>
    `).join('');

    const detailsHTML = `
        <div class="details-header">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="Artwork de ${data.name}">
            <div class="header-info">
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <div class="types-container">${types}</div>
            </div>
        </div>
        <div class="details-body">
            <h3>Base Stats</h3>
            <div class="stats-grid">${stats}</div>
        </div>
    `;
    displayContainer.innerHTML = detailsHTML;
}

renderSelectors();

selectorContainer.addEventListener('click', async (event) => {
    const button = event.target.closest('.selector-btn');
    if (button) {
        const pokemonApiName = button.dataset.pokemonApiname;
        
        displayContainer.innerHTML = `<p class="placeholder-text">Loading...</p>`;
        
        const pokemonData = await fetchPokemonDetails(pokemonApiName);
        if (pokemonData) {
            displayPokemonDetails(pokemonData);
        }
    }
});