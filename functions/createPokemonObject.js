const { getPokemonData, callApisSequentially } = require("./callPokemonAPI");
const { displayError } = require("./displayError");

const createPokemonObject = async (data) => {
  const pokemonArray = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((pokemon) => {
      return {
        name: pokemon,
        apiCall: () => getPokemonData(pokemon),
      };
    });

  const pokemonVarietyObject = await callApisSequentially(pokemonArray);

  let alternateForms;
  const jsonArray = await Promise.all(
    pokemonVarietyObject.map(async (pokeObject) => {
      try {
        const { name, id, varieties } = pokeObject;
        alternateForms = varieties.map((variant) => variant.pokemon.name);
        return {
          name,
          id,
          alternateForms: alternateForms ? alternateForms : [],
        };
      } catch (err) {
        displayError(methodName, err);
      }
    })
  );
  const jsonString = JSON.stringify(jsonArray, null, 2);
  return jsonString;
};

module.exports = { createPokemonObject };
