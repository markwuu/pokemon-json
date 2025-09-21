const { convertTxtFileToJSON } = require("./functions/fileFunctions");
const inputFile = "./files/inputFiles/pokemon2.txt";
const outputFile = "./files/outputFiles/pokemon.json";

convertTxtFileToJSON(inputFile, outputFile);
