const fs = require("fs");
const { tryCatch } = require("./callFunction");
const { createPokemonObject } = require("./createPokemonObject");

const writeFile = (inputFile, outputFile, jsonString) => {
  tryCatch("writeFile", () =>
    fs.writeFile(outputFile, jsonString, "utf8", (err) => {
      if (err) return;
      console.log(`Successfully converted '${inputFile}' to '${outputFile}'`);
    })
  );
};

const convertTxtFileToJSON = async (inputFile, outputFile) => {
  tryCatch("convertTxtFileToJSON", () =>
    fs.readFile(inputFile, "utf8", async (err, data) => {
      if (err) return;
      return writeFile(inputFile, outputFile, await createPokemonObject(data));
    })
  );
};

module.exports = { convertTxtFileToJSON };
