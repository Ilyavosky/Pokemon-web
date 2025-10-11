export function createTeamService(repository, renderer) {
    return {
        async displayPokemonDetails(pokemonName) {
            renderer.showLoading();
            const pokemon = await repository.getPokemonByName(pokemonName);
            if (pokemon) {
                renderer.renderPokemonDetails(pokemon);
            } else {
                renderer.showError(`Could not fetch data for ${pokemonName}.`);
            }
        },
        
    };
}