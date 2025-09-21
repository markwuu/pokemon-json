const getRequest = require("./getRequest");
const displayError = require("./callFunction");

async function getPokemonData(pokemon) {
  const methodName = "getPokemonData";

  try {
    const response = await getRequest(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
    );
    return JSON.parse(response);
  } catch (err) {
    displayError(methodName, err);
  }
}

async function callApisSequentially(pokemonArrayObject) {
  const methodName = "callApisSequentially";

  try {
    const results = [];
    for (const pokemonObject of pokemonArrayObject) {
      const response = await pokemonObject.apiCall();
      const { id, varieties, name } = response;
      results.push({
        id,
        name,
        varieties,
      });
    }
    return results;
  } catch (err) {
    displayError(methodName, err);
  }
}

module.exports = {
  getPokemonData,
  callApisSequentially,
};
