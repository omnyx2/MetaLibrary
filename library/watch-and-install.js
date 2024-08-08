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
const buildBook = async (dir) => {
  const projectDir = path.resolve(baseDir, dir);
  console.log(`Building and serving ${projectDir}`);
  try {
    await execPromise(`cd ${projectDir} && npm run build`);
    console.log(`Successfully built and served ${projectDir}`);
  } catch (err) {
    console.error(`Error building and serving ${dir}:`, err.message);
  }
};

// Function to build and serve a project
const installPackages = (dir) => {
  const projectDir = path.resolve(baseDir, dir);
  console.log(`Building and serving ${projectDir}`);
  exec(`cd ${projectDir} && npm install`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error building and serving ${dir}:`, err.message);
      return;
    }
    console.log(`Output for ${dir}:\n`, stdout);
    if (stderr) console.error(`Errors for ${dir}:\n`, stderr);
  });
};

// Initial build and serve for existing directories
fs.readdir(baseDir, (err, dirs) => {
  if (err) {
    console.error('Error reading base directory:', err.message);
    return;
  }
  dirs.forEach(dir => {
    if (dir.startsWith('book-')) {
      installPackages(dir);
      // watchAndServe(dir);
      console.log("Wah",dir);
    }
  });
  dirs.forEach(dir => {
    if (dir.startsWith('book-')) {
      buildBook(dir);
      // watchAndServe(dir);
      console.log("Wah",dir);
    }
  });
});



//       // Watcher for new directories
// chokidar.watch(`${baseDir}/${dir}`, { ignoreInitial: true }).on('addDir', (dirPath) => {
//   const dirName = path.basename(dirPath);
//   if (dirName.startsWith('pages')) {
//     console.log(`New directory detected: ${dirPath}`);
//     watchAndServe(dirName);
//   }
// }).on('error', (error) => {
//   console.error(`Watcher error: ${error.message}`);
// });

console.log(`Watching ${baseDir} for new projects...`);
