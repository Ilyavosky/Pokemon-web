const wolfeyTeam = [
    {
        id: 591,
        name: "Amoonguss",
        item: "Mental Herb",
        ability: "Regenerator",
        teraType: "Dark",
        moves: ["Protect", "Rage Powder", "Spore", "Sludge Bomb"],
        nameColor: "#BD919C"
    },
    {
        id: 727,
        name: "Incineroar",
        item: "Safety Goggles",
        ability: "Intimidate",
        teraType: "Bug",
        moves: ["Fake Out", "Parting Shot", "Flare Blitz", "Protect"],
        nameColor: "#A93124"
    },
    {
        id: 985,
        name: "Scream Tail",
        item: "Booster Energy",
        ability: "Protosynthesis",
        teraType: "Dark",
        moves: ["Protect", "Encore", "Disable", "Perish Song"],
        nameColor: "#ECB1CD"
    },
    {
        id: 1007,
        name: "Koraidon",
        item: "Life Orb",
        ability: "Orichalcum Pulse",
        teraType: "Fire",
        moves: ["Protect", "Flare Blitz", "Close Combat", "Flame Charge"],
        nameColor: "#A9555C"
    },
    {
        id: 987,
        name: "Flutter Mane",
        item: "Focus Sash",
        ability: "Protosynthesis",
        teraType: "Normal",
        moves: ["Protect", "Icy Wind", "Moonblast", "Shadow Ball"],
        nameColor: "#74BCB4"
    },
    {
        id: 576,
        name: "Gothitelle",
        item: "Leftovers",
        ability: "Shadow Tag",
        teraType: "Water",
        moves: ["Protect", "Psychic", "Fake Out", "Taunt"],
        nameColor: "white"
    }
];

const container = document.getElementById('pokemon-team-container')

const teamHTML = wolfeyTeam.map(pokemon => {
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const movesHTML = pokemon.moves.map(move => `<li>${move}</li>`).join('');

    return `
        <div class="pokemon-card">
            <div class="card-inner">
                <div class="card-front">
                    <img class="pokemon-sprite" src="${spriteUrl}" alt="Sprite de ${pokemon.name}">
                    <h2 class="pokemon-name" style="color: ${pokemon.nameColor};">${pokemon.name}</h2>
                </div>
                <div class="card-back">
                    <h3 class="pokemon-name-back" style="color: ${pokemon.nameColor};">${pokemon.name}</h3>
                    <div class="pokemon-details">
                        <p><strong>Item:</strong> ${pokemon.item}</p>
                        <p><strong>Ability:</strong> ${pokemon.ability}</p>
                        <p><strong>Tera Type:</strong> ${pokemon.teraType}</p>
                    </div>
                    <div class="pokemon-moves">
                        <h4>Moves:</h4>
                        <ul>
                            ${movesHTML}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}).join('');

container.innerHTML = teamHTML;

const cards = document.querySelectorAll('.pokemon-card');

cards.forEach(card =>{
    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });
});


