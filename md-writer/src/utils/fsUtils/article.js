import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const ARTICLESDIR = path.join(process.cwd(), '../nextra-docs-template/pages/SLAM/');
const articlesDir = ARTICLESDIR

const checkDuplicateTitle = async (title) => {
  const files = await fs.readdir(articlesDir);
  console.log(files)

  for (const file of files) {
    if (file === title) {
      // console.log(file, title)
      return true;
    }
  }
  console.log("no")
  return false;
};

export const readArticles = async () => {
  await fs.ensureDir(articlesDir);
  const files = await fs.readdir(articlesDir);
  const articles = await Promise.all(files.map(async (file) => {
    const filePath = path.join(articlesDir, file);
    const article = await fs.readFile(filePath, 'utf-8');
    return { id: path.basename(file, '.json'), article };
  }));

  return articles;
};

export const createArticle = async (title, markdown) => {
    const id = uuidv4();
    if(await checkDuplicateTitle(title)) {
      return { message: "Duplicatied article", status: 409}
    }
    const filePath = path.join(articlesDir, `${title}.mdx`);
    console.log(articlesDir)
    await fs.ensureDir(articlesDir);
    await fs.writeFile(filePath, markdown);

    return { message: 'Article created successfully!', status: 200, id };
};

export const readArticle = async (id) => {
    await fs.ensureDir(articlesDir);
    console.log(articlesDir)

    const filePath = path.join(articlesDir, `${id}.mdx`);
    try {
        if (await fs.pathExists(filePath)) {
          const article = await fs.readFile(filePath, 'utf-8');
          return { message: 'Found article file', article }
        }
      } catch (error) {
        console.error('Error reading article file:', error);
        return { message: 'Error reading article file', status: 404}
      }
  };

export const updateArticle = async (title, article) => {
  const filePath = path.join(articlesDir, `${title}.mdx`);
  if (await fs.pathExists(filePath)) {
    await fs.writeFile(filePath, article);
    return { message: 'Article updated successfully!' };
  }
  
  return { message: 'Article not found', status: 404 };
};

export const deleteArticle = async (title) => {
  const filePath = path.join(articlesDir, `${title}.mdx`);

  if (await fs.pathExists(filePath)) {
    await fs.remove(filePath);
    return { message: 'Article deleted successfully!' };
  }

  return { message: 'Article not found', status: 404 };
};
 