const sendGetReq = require("./sendGetReq");
const { tryCatch } = require("./callFunction");

const getPokemonSpeciesData = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;
  return tryCatch("getPokemonSpeciesData", async () =>
    JSON.parse(await sendGetReq(url))
  );
};

const createPokeVarietyObj = async (pokemonObject) => {
  return tryCatch("createPokeVarietyObj", async () => {
    const results = [];
    for (const obj of pokemonObject) {
      const { id, varieties, name } = await obj.apiCall();

      const alternateForms = varieties.map((variant) => variant.pokemon.name);
      results.push({
        id,
        name,
        alternateForms: alternateForms ? alternateForms : [],
      });
    }

    return results;
  });
};

module.exports = {
  getPokemonSpeciesData,
  createPokeVarietyObj,
};
