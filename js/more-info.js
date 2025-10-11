import { pokemonRepository } from './infrastructure/driven-adapters/PokeApiAdapter.js';
import { createDomRenderer } from './infrastructure/driving-adapters/DomRenderer.js';
import { createTeamService } from './application/TeamService.js';

const wolfeyTeam = [
    { id: 591, name: "Amoonguss", apiName: "amoonguss" },
    { id: 727, name: "Incineroar", apiName: "incineroar" },
    { id: 985, name: "Scream Tail", apiName: "scream-tail" },
    { id: 1007, name: "Koraidon", apiName: "koraidon" },
    { id: 987, name: "Flutter Mane", apiName: "flutter-mane" },
    { id: 576, name: "Gothitelle", apiName: "gothitelle" }
];

document.addEventListener('DOMContentLoaded', () => {
    const renderer = createDomRenderer('pokemon-selector', 'pokemon-details-display');
    const teamService = createTeamService(pokemonRepository, renderer);


renderer.renderPokemonSelectors(wolfeyTeam, (pokemonName) => {
            teamService.displayPokemonDetails(pokemonName);
        });
});