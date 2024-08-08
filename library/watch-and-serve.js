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
const serveBook = async (dir) => {
  const projectDir = path.resolve(baseDir, dir);
  console.log(`Building and serving ${projectDir}`);
  try {
    await execPromise(`cd ${projectDir} && npm run start`);
    console.log(`Successfully built and served ${projectDir}`);
  } catch (err) {
    console.error(`Error building and serving ${dir}:`, err.message);
  }
};

// Initial build and serve for existing directories
fs.readdir(baseDir, (err, dirs) => {
  if (err) {
    console.error('Error reading base directory:', err.message);
    return;
  }
  dirs.forEach(dir => {
    if (dir.startsWith('book-')) {
      serveBook(dir);
      // watchAndServe(dir);
      console.log("Wah",dir);
    }
  });
});



// //       // Watcher for new directories
// chokidar.watch(`${baseDir}/${dir}`, { ignoreInitial: true }).on('addDir', (dirPath) => {
//   const dirName = path.basename(dirPath);
//   if (dirName.startsWith('pages')) {
//     console.log(`New directory detected: ${dirPath}`);
//     serveBook(dirName);
//   }
// }).on('error', (error) => {
//   console.error(`Watcher error: ${error.message}`);
// });

console.log(`Watching ${baseDir} for new projects...`);
