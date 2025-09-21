const {
  getPokemonSpeciesData,
  createPokeVarietyObj,
} = require("./callPokemonAPI");

const buildPokemonJsonObj = async (data) => {
  const pokemonApiArray = data
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((pokemon) => {
      return {
        name: pokemon,
        apiCall: () => getPokemonSpeciesData(pokemon),
      };
    });

  const pokemonVarietyObj = await createPokeVarietyObj(pokemonApiArray);
  return JSON.stringify(pokemonVarietyObj, null, 2);
};

module.exports = { buildPokemonJsonObj };
