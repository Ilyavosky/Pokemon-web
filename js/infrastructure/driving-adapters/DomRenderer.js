export function createDomRenderer(selectorContainerId, displayContainerId) {
    const selectorContainer = document.getElementById(selectorContainerId);
    const displayContainer = document.getElementById(displayContainerId);

    return {
        renderPokemonSelectors(team, onSelect) {
            selectorContainer.innerHTML = team.map(pokemon => `
                <button class="selector-btn" data-pokemon-apiname="${pokemon.apiName}">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Sprite de ${pokemon.name}">
                    <span>${pokemon.name}</span>
                </button>
            `).join('');

            selectorContainer.addEventListener('click', (event) => {
                const button = event.target.closest('.selector-btn');
                if (button) {
                    onSelect(button.dataset.pokemonApiname);
                }
            });
        },

        renderPokemonDetails(pokemon) {
            const typesHTML = pokemon.types.map(type => `<span class="type-badge type-${type}">${type}</span>`).join('');
            const statsHTML = Object.entries(pokemon.stats).map(([name, value]) => `
                <div class="stat-row">
                    <span class="stat-name">${name}</span>
                    <span class="stat-value">${value}</span>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${Math.min(value, 200) / 2}%"></div>
                    </div>
                </div>
            `).join('');

            displayContainer.innerHTML = `
                <div class="details-header">
                    <img src="${pokemon.artworkUrl}" alt="Artwork de ${pokemon.name}">
                    <div class="header-info">
                        <h2>${pokemon.name}</h2>
                        <div class="types-container">${typesHTML}</div>
                    </div>
                </div>
                <div class="details-body">
                    <h3>Base Stats</h3>
                    <div class="stats-grid">${statsHTML}</div>
                </div>
            `;
        },
        

        showLoading() {
            displayContainer.innerHTML = `<p class="placeholder-text">Loading...</p>`;
        },

        showError(message) {
            displayContainer.innerHTML = `<p class="error-text">${message}</p>`;
        }
    };
}