const wolfeyTeam = [
    { id: 591, name: "Amoonguss", apiName: "amoonguss" },
    { id: 727, name: "Incineroar", apiName: "incineroar" },
    { id: 985, name: "Scream Tail", apiName: "scream-tail" },
    { id: 1007, name: "Koraidon", apiName: "koraidon" },
    { id: 987, name: "Flutter Mane", apiName: "flutter-mane" },
    { id: 576, name: "Gothitelle", apiName: "gothitelle" }
];

const spritesContainer = document.getElementById('team-sprites');
const resultsContainer = document.getElementById('analysis-results');

async function analyzeTeam() {
    try {
        const pokemonPromises = wolfeyTeam.map(p => fetch(`https://pokeapi.co/api/v2/pokemon/${p.apiName}`).then(res => res.json()));
        const pokemonDataArray = await Promise.all(pokemonPromises);

        displaySprites(pokemonDataArray);

        const typeUrls = new Set(); 
        pokemonDataArray.forEach(p => {
            p.types.forEach(typeInfo => {
                typeUrls.add(typeInfo.type.url);
            });
        });

        const typePromises = [...typeUrls].map(url => fetch(url).then(res => res.json()));
        const typesDataArray = await Promise.all(typePromises);

        const analysis = {
            weaknesses: {},
            resistances: {},
            immunities: {}
        };

        typesDataArray.forEach(typeData => {
            typeData.damage_relations.double_damage_from.forEach(type => {
                analysis.weaknesses[type.name] = (analysis.weaknesses[type.name] || 0) + 1;
            });
            typeData.damage_relations.half_damage_from.forEach(type => {
                analysis.resistances[type.name] = (analysis.resistances[type.name] || 0) + 1;
            });
            typeData.damage_relations.no_damage_from.forEach(type => {
                analysis.immunities[type.name] = (analysis.immunities[type.name] || 0) + 1;
            });
        });
        
        displayAnalysis(analysis);

    } catch (error) {
        console.error("Error analyzing team:", error);
        resultsContainer.innerHTML = `<div class="results-placeholder"><p>Error al analizar el equipo. Intenta de nuevo.</p></div>`;
    }
}

function displaySprites(pokemonDataArray) {
    const spritesHTML = pokemonDataArray.map(p => `
        <img src="${p.sprites.front_default}" alt="Sprite de ${p.name}" title="${p.name.charAt(0).toUpperCase() + p.name.slice(1)}">
    `).join('');
    spritesContainer.innerHTML = spritesHTML;
}

function displayAnalysis(analysis) {
    const createSectionHTML = (title, data) => {
        const sortedEntries = Object.entries(data).sort(([,a],[,b]) => b - a);

        const itemsHTML = sortedEntries.map(([type, count]) => `
            <div class="type-analysis-item">
                <span class="type-badge type-${type}">${type}</span>
                <span class="type-count">x${count}</span>
            </div>
        `).join('');

        return `
            <div class="analysis-section">
                <h3>${title}</h3>
                <div class="analysis-grid">${itemsHTML || '<p>None</p>'}</div>
            </div>
        `;
    };

    const weaknessesHTML = createSectionHTML('Team Weaknesses (x2)', analysis.weaknesses);
    const resistancesHTML = createSectionHTML('Team Resistances (x0.5)', analysis.resistances);
    const immunitiesHTML = createSectionHTML('Team Immunities (x0)', analysis.immunities);

    const rightColumnHTML = `
        <div>
            ${resistancesHTML}
            ${immunitiesHTML}
        </div>
    `;

    resultsContainer.innerHTML = weaknessesHTML + rightColumnHTML;
}


analyzeTeam();