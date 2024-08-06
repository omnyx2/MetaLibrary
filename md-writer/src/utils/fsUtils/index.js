const fs = require('fs');
const path = require('path');

// Configuration (adjust these based on your needs)
const dataDirectory = './data'; // Path to your data directory

// Function to read a directory
function readDir(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    return [];
  }
}

// Function to save a file
function saveFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, data);
    console.log(`File saved successfully: ${filePath}`);
  } catch (err) {
    console.error(`Error saving file: ${err}`);
  }
}

// Function to read a file
function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return '';
  }
}

// Function to update a file (overwrite)
function updateFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, data);
    console.log(`File updated successfully: ${filePath}`);
  } catch (err) {
    console.error(`Error updating file: ${err}`);
  }
}

// Example Usage:

// Read the contents of the data directory
const files = readDir(dataDirectory);
console.log('Files in the directory:', files);

// Save a new file (example: "myFile.txt")
const filePath = path.join(dataDirectory, 'myFile.txt');
const fileContent = 'This is the content of myFile.txt';
saveFile(filePath, fileContent);

// Read the content of a file
const fileData = readFile(filePath);
console.log('File content:', fileData);

// Update the content of a file
const updatedContent = 'This is the updated content.';
updateFile(filePath, updatedContent);

// Example of saving multiple files based on values and parameters
const values = ['value1', 'value2'];
const parameters = ['param1', 'param2'];

for (let i = 0; i < values.length; i++) {
  const value = values[i];
  const parameter = parameters[i];

  // Generate a filename based on value and parameter
  const fileName = `file_${value}_${parameter}.txt`;
  const fileContent = `Value: ${value}, Parameter: ${parameter}`;
  const fullFilePath = path.join(dataDirectory, fileName);

  saveFile(fullFilePath, fileContent);
}