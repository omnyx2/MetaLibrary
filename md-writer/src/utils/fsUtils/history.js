// lib/fileSystem.js
import fs from 'fs-extra';
import path from 'path';
// 놀랍게도 히스토리에 delete 따위는 없다 영원불멸할 아티클이다.
const HISTORY_DIR_PATH = path.join(process.cwd(),  'public/history');

export async function readHistoryFiles() {
  try {
    await fs.ensureDir(HISTORY_DIR_PATH);
    const files = await fs.readdir(HISTORY_DIR_PATH);
    const histories = await Promise.all(files.map(async (file) => {
      const filePath = path.join(HISTORY_DIR_PATH, file);
      const history = await fs.readFile(filePath, 'utf-8');
      return { id: path.basename(file, '.json'), history };
    }))
    return histories;

  } catch (error) {
    return '[]';
  }
}

export async function readHistoryFile(id) {
  try {
    const filePath = path.join(HISTORY_DIR_PATH, `${id}.json`);
    try {
      if (await fs.pathExists(filePath)) {
        const history = await fs.readFile(filePath, 'utf-8');
        return { message: 'Found history file', history }
      }
    } catch (error) {
      console.error('Error reading history file:', error);
      return { message: 'Error reading history file', status: 404}
    }
  }  catch (error) {
    return { message: 'Error reading unauth file', status: 404}
  }
}

export const createHistoryFile = async (id, history) => {
  const filePath = path.join(HISTORY_DIR_PATH, `${id}.json`);

  await fs.ensureDir(HISTORY_DIR_PATH);
  await fs.writeFile(filePath, history);

  return { message: 'History created successfully!', id };
};

export const updateHistoryFile = async (id, history) => {
  const filePath = path.join(HISTORY_DIR_PATH, `${id}.json`);

  if (await fs.pathExists(filePath)) {
    console.log(history)
    await fs.writeFile(filePath, history);
    return { message: 'History updated successfully!', id };
  }
  
  return { message: 'History not found', status: 404 };
};



