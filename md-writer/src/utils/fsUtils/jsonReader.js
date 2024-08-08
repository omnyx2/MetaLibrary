import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from './fileReader';
const HISTORY_DIR_PATH = path.join(process.cwd(),  'public/history');
const ARTICLESDIR = path.join(process.cwd(), './metaconfigs/topics/topicList');
const articlesDir = ARTICLESDIR

export const readJson = async () => {
    await fs.ensureDir(articlesDir);
    const files = await fs.readdir(articlesDir);
    const articles = await Promise.all(files.map(async (file) => {
      const filePath = path.join(articlesDir, file);
      const article = await fs.readFile(filePath, 'utf-8');
      return { id: path.basename(file, '.json'), article };
    }));
  
    return articles;
  };
  