import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getTitleFromMarkDownOnly } from '../takeHeadersAsTitle';
const articlesDir = path.join(process.cwd(), 'public/articles');
// const ARTICLESDIR = path.join(process.cwd(), '../nextra-docs-template/pages/SLAM');
// const articlesDir = ARTICLESDIR
export const readMarkdowns = async () => {
  await fs.ensureDir(articlesDir);
  const files = await fs.readdir(articlesDir);
  const markdowns = await Promise.all(files.map(async (file) => {
    const filePath = path.join(articlesDir, file);
    const markdown = await fs.readFile(filePath, 'utf-8');
    return { id: path.basename(file, '.mdx'), markdown };
  }));

  return markdowns;
};

export const readMarkdownDOIs = async () => {
    await fs.ensureDir(articlesDir);
    const files = await fs.readdir(articlesDir);
    const markdowns = await Promise.all(files.map(async (file) => {
      const filePath = path.join(articlesDir, file);
      const markdown = await fs.readFile(filePath, 'utf-8');
      // 여기에 auth 로직 추가
      return { id: path.basename(file, '.mdx'), markdown: markdown, title: getTitleFromMarkDownOnly(markdown) };
    }));
  
    return markdowns;
  };

export const createMarkdown = async (markdown) => {
    const id = uuidv4();

    const filePath = path.join(articlesDir, `${id}.mdx`);
    await fs.ensureDir(articlesDir);
    await fs.writeFile(filePath, markdown);
  
    return { message: 'Markdown created successfully!', id };
};

export const readMarkdown = async (id) => {
    await fs.ensureDir(articlesDir);
 
    const filePath = path.join(articlesDir, `${id}.mdx`);
    try {
        if (await fs.pathExists(filePath)) {
          const markdown = await fs.readFile(filePath, 'utf-8');
          return { message: 'Found markdown file', markdown }
        }
      } catch (error) {
        console.error('Error reading markdown file:', error);
        return { message: 'Error reading markdown file', status: 404}
      }
  };

export const updateMarkdown = async (id, markdown) => {
  const filePath = path.join(articlesDir, `${id}.mdx`);
  console.log(articlesDir)
  if (await fs.pathExists(filePath)) {
    console.log(markdown)
    await fs.writeFile(filePath, markdown);
    return { message: 'Markdown updated successfully!' };
  }
  
  return { message: 'Markdown not found', status: 404 };
};

export const deleteMarkdown = async (id) => {
  const filePath = path.join(articlesDir, `${id}.mdx`);

  if (await fs.pathExists(filePath)) {
    await fs.remove(filePath);
    return { message: 'Markdown deleted successfully!' };
  }

  return { message: 'Markdown not found', status: 404 };
};
