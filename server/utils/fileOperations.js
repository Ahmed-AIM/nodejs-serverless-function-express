const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(process.cwd(), 'server', 'data');

async function readData(fileName) {
  // const filePath = path.join(dataPath, fileName);
  const data = await fs.readFile('../server/data/data.json', 'utf8');
  return JSON.parse(data);
}

async function writeData(fileName, data) {
  // const filePath = path.join(dataPath, fileName);
  await fs.writeFile('../server/data/data.json', JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
