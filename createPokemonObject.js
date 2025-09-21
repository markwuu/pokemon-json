const fs = require("fs");
const inputTxtFile = "pokemon.txt";
const outputJsonFile = "pokemon.json";
const getRequest = require("./getRequest");

async function getPokemonData(pokemon) {
  try {
    const response = await getRequest(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
    );
    return JSON.parse(response);
  } catch (err) {
    console.error("An error occurred: ", err.message);
  }
}

async function callApisSequentially(pokemonArrayObject) {
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
    console.error(
      "An error occurred in the function callApisSequentially: ",
      err.message
    );
  }
}

async function readFile() {
  fs.readFile(inputTxtFile, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading the TXT file:", err);
      return;
    }

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
          console.log("error", err);
        }
      })
    );
    const jsonString = JSON.stringify(jsonArray, null, 2);

    fs.writeFile(outputJsonFile, jsonString, "utf8", (err) => {
      if (err) {
        console.error("Error writing the JSON file:", err);
        return;
      }
      console.log(
        `Successfully converted '${inputTxtFile}' to '${outputJsonFile}'.`
      );
    });
  });
}

readFile();
