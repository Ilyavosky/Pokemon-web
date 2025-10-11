import { createPokemon } from '../../domain/entities/Pokemon.js';
const API_BASE_URL = 'https://pokeapi.co/api/v2';

function mapApiDataToPokemon(apiData) {
    const stats = apiData.stats.reduce((acc, statInfo) => {
        acc[statInfo.stat.name.replace('-', '')] = statInfo.base_stat;
        return acc;
    }, {});

    return createPokemon(
        apiData.id,
        apiData.name,
        apiData.types.map(t => t.type.name),
        stats,
        apiData.sprites.front_default,
        apiData.sprites.other['official-artwork'].front_default
    );
}

export const pokemonRepository = {
    async getPokemonByName(name) {
        try {
            const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
            if (!response.ok) throw new Error(`Pokemon not found: ${name}`);
            const data = await response.json();
            return mapApiDataToPokemon(data);
        } catch (error) {
            console.error('PokeApiAdapter Error:', error);
            return null; 
        }
    },

    async getTypesData(typeUrls) {
        const typePromises = [...typeUrls].map(url => fetch(url).then(res => {
            if (!res.ok) throw new Error(`Type not found: ${url}`);
            return res.json();
        }));
        return Promise.all(typePromises);
    }
};