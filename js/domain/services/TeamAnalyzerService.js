export function analyzeSynergies(typesDataArray) {
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

    return analysis;
}