const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(process.cwd(), 'server', 'data');

async function readData(fileName) {
  const filePath = path.join(dataPath, fileName);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function writeData(fileName, data) {
  const filePath = path.join(dataPath, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
