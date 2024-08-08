import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const ARTICLESDIR = path.join(process.cwd(), '../library/books/book-')
const PREFIX='/pages/';


const checkDuplicateTitle = async (booktitle, topic) => {
  const files = await fs.readdir(ARTICLESDIR+booktitle+PREFIX+topic);
  console.log(files)

  for (const file of files) {
    if (file === topic) {
      // console.log(file, topic)
      return true;
    }
  }
  console.log("no")
  return false;
};

export const readArticles = async (booktitle) => {
  await fs.ensureDir(ARTICLESDIR+booktitle+PREFIX+"/");
  const files = await fs.readdir(booktitle);
  const articles = await Promise.all(files.map(async (file) => {
    const filePath = path.join(booktitle, file);
    const article = await fs.readFile(filePath, 'utf-8');
    return { id: path.basename(file, '.json'), article };
  }));

  return articles;
};

export const createArticle = async (booktitle, topic, articleTitle, markdown) => {
    const id = uuidv4();
    if(await checkDuplicateTitle(booktitle,topic)) {
      console.log("Dupilcation")
      return { message: "Duplicatied article", status: 409}
    }
    console.log(ARTICLESDIR+booktitle+PREFIX+topic,booktitle)
    const filePath = path.join(ARTICLESDIR+booktitle+PREFIX+topic, `${articleTitle}.mdx`);
    await fs.ensureDir(ARTICLESDIR+booktitle+PREFIX+topic);
    await fs.writeFile(filePath, markdown);

    return { message: 'Article created successfully!', status: 200, id };
};

export const readArticle = async (booktitle, topic, articleTitle) => {
    await fs.ensureDir(ARTICLESDIR+booktitle+PREFIX);
    console.log(ARTICLESDIR+booktitle+PREFIX)

    const filePath = path.join(ARTICLESDIR+booktitle+PREFIX+topi+"/", `${articleTitle}.mdx`);
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

export const updateArticle = async (booktitle, topic, markdown) => {
  const filePath = path.join(ARTICLESDIR+booktitle+PREFIX+topic+"/", `${articleTitle}.mdx`);
  if (await fs.pathExists(filePath)) {
    await fs.writeFile(filePath, markdown);
    return { message: 'Article updated successfully!' };
  }
  
  return { message: 'Article not found', status: 404 };
};

export const deleteArticle = async (booktitle, topic) => {
  const filePath = path.join(ARTICLESDIR+booktitle+PREFIX+topic+"/", `${articleTitle}.mdx`);

  if (await fs.pathExists(filePath)) {
    await fs.remove(filePath);
    return { message: 'Article deleted successfully!' };
  }

  return { message: 'Article not found', status: 404 };
};
 