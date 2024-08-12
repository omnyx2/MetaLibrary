const fs = require('fs-extra');
const path = require('path');

// Configuration (adjust these based on your needs)
const dataDirectory = './data'; // Path to your data directory


async function checkDir(filePath) {
  try {
    await fs.ensureDir(filePath);
    return filePath
  } catch {
    console.error(`Error reading directory: ${filePath}|| \n Error Log: ${err}`);
  }
}

async function checkDirIsClear(filePath) {
  try {
    await fs.ensureDir(filePath);
    console.error(`Error Already exist directory: ${filePath}|| \n Error Log: ${409}`);
  } catch {
    return filePath
  }
}

async function checkFile(filePath) {
  try {
    await fs.ensureFile(filePath);
    return filePath
  } catch {
    console.error(`Error reading File: ${filePath}|| \n Error Log: ${err}`);
  }
}

async function checkFileNonExist(filePath) {
  try {
    if(fs.existsSync(filePath)) console.error(`Error Already exist File: ${filePath}|| \n Error Log: ${409}`);
    await fs.ensureFile(filePath);
    return filePath
   } catch {
    console.error(`Error Already exist File pos error: ${err} `);
    return filePath
  }
}

// Function to read a directory 
export async function readDir(dirPath) {
  try {
    return await fs.readdirSync(await checkDir(dirPath));;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    return [];
  }
}

export async function readDirWithConditions(dirPath, fn) {
  try {
    return await fs.readdirSync(await checkDir(dirPath)).filter(file=> fn(file));
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    return [];
  }
}


export async function readFileList(filePath) {
  try {
    const fileList = await fs.readdir(await checkDir(filePath))
    return [...fileList];
  } catch (err) {
    console.error(`Error reading fileList: ${err}`);
    return '';
  }
}

// Function to save a file
export async function createFile(filePath, data) {
  try {
    const filePathSave = await checkFileNonExist(filePath);
    return await fs.writeFileSync(filePathSave, data);
  } catch (err) {
    console.error(`Error saving file: ${err} | ${filePath} ${data}`);
    return Error(`Error saving file: ${err}`);
  }
}

// Function to read a file
export async function readFile(filePath) {
  try {
    return await fs.readFileSync(await checkFile(filePath), 'utf-8');
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    return '';
  }
}

// Function to update a file (overwrite)
export async function updateFile(filePath, data) {
  try {
    fs.writeFileSync(await checkFile(filePath), data);
    console.log(`File updated successfully: ${filePath}`);
    return { status: 200}
  } catch (err) {
    console.error(`Error updating file: ${err}`);
    return { status: 403}

  }
}

// making
export async function deleteFile(filePath) {
  try {
    fs.deleteFile(await checkFile(filePath));
    console.log(`File updated successfully: ${filePath}`);
  } catch (err) {
    console.error(`Error updating file: ${err}`);
  }
}
