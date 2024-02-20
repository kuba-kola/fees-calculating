const fs = require('fs');

const readInputFromFile = (filePath) => {
    const inputData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(inputData);
}

module.exports = { readInputFromFile };
