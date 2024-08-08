const chokidar = require('chokidar');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Base directory to watch
const baseDir = path.resolve(__dirname, 'books/');
// Promisify exec for easier async/await usage
const execPromise = promisify(exec);

// Function to build and serve a project
const devBook = async (dir) => {
  const projectDir = path.resolve(baseDir, dir);
  console.log(`Building and serving ${projectDir}`);
  try {
    await execPromise(`cd ${projectDir} && npm install && npm run build && npm run dev`);
    console.log(`Successfully built and served ${projectDir}`);
  } catch (err) {
    console.error(`Error building and serving ${dir}:`, err.message);
  }
};
 
 
fs.readdir(baseDir, (err, dirs) => {
  if (err) {
    console.error('Error reading base directory:', err.message);
    return;
  }
  dirs.forEach(dir => {
    if (dir.startsWith('book-')) {
      devBook(dir);
     }
  });
});
 

console.log(`Watching ${baseDir} for new projects...`);
