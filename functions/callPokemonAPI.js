const sendGetReq = require("./sendGetReq");
const { tryCatch } = require("./callFunction");

const getPokemonSpeciesData = async (pokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;
  return tryCatch("getPokemonSpeciesData", async () =>
    JSON.parse(await sendGetReq(url))
  );
};

const createPokeObjectFromApiCall = async (pokemonApiObject) => {
  return tryCatch("createPokeObjectFromApiCall", async () => {
    const results = [];
    for (const obj of pokemonApiObject) {
      const { id, varieties, name } = await obj.apiCall();
      results.push({
        id,
        name,
        varieties,
      });
    }

    return results;
  });
};

module.exports = {
  getPokemonSpeciesData,
  createPokeObjectFromApiCall,
};
