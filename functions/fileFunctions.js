const fs = require("fs");
const outputJsonFile = "./files/outputFiles/pokemon.json";
const inputTxtFile = "./files/inputFiles/pokemon2.txt";
const { displayError } = require("./displayError");
const { createPokemonObject } = require("./createPokemonObject");

const writeFile = (jsonString) => {
  const methodName = "writeFile";

  try {
    fs.writeFile(outputJsonFile, jsonString, "utf8", (err) => {
      if (err) {
        displayError(methodName, err);
        return;
      }
      console.log(
        `Successfully converted '${inputTxtFile}' to '${outputJsonFile}'.`
      );
    });
  } catch (err) {
    displayError(methodName, err);
  }
};

const convertTxtFileToJSON = async () => {
  const methodName = "convertTxtFileToJSON";

  try {
    fs.readFile(inputTxtFile, "utf8", async (err, data) => {
      const jsonString = await createPokemonObject(data);
      writeFile(jsonString);
    });
  } catch (err) {
    displayError(methodName, err);
  }
};

convertTxtFileToJSON();
