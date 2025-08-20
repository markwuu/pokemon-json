const fs = require('fs');

const inputTxtFile = 'pokemon.txt';
const outputJsonFile = 'pokemon.json';

fs.readFile(inputTxtFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the TXT file:', err);
        return;
    }
    const lines = data.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
    const jsonArray = lines.map((line, index) => ({ name: line.trim(), number: index + 1 }));
    const jsonString = JSON.stringify(jsonArray, null, 2);

    fs.writeFile(outputJsonFile, jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the JSON file:', err);
            return;
        }
        console.log(`Successfully converted '${inputTxtFile}' to '${outputJsonFile}'.`);
    });

});