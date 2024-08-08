import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getTitleFromMarkDownOnly } from '../takeHeadersAsTitle';
import { readFile, createFile, updateFile, readFileList } from './fileReader';
import DIR from './dir.json'
const articlesDir = path.join(process.cwd(), 'public/articles');
// const ARTICLESDIR = path.join(process.cwd(), '../nextra-docs-template/pages/SLAM');
// const articlesDir = ARTICLESDIR

function makeArticlePath({ arg="", POSTFIX = ""}) {
  return path.join(process.cwd(), DIR.ARTICLE_FILE_PATH) + arg + POSTFIX;
}

export const readMarkdowns = async () => {
    try {
      const files = await readFileList(makeArticlePath({arg:"", POSTFIX:""}))

      const markdowns = await Promise.all(files.map(async (file) => {
        const markdown = await readFile(makeArticlePath({arg: file}));
        const title = await getTitleFromMarkDownOnly(markdown);
        return { id: path.basename(file, '.mdx'), markdown, title };
      }));
      return markdowns;
    } catch(err) {
      console.log(`Error: at Reading markdowns ${err}`)
    }
};

export const readMarkdownlist = async () => {
  try {
    return await readFileList(makeArticlePath({arg:"", POSTFIX:""})) ;
  } catch(err) {
    console.log(`Error: at Reading markdown list ${err}`)
  }
};


export const createMarkdown = async (markdown) => {
  const id = uuidv4();
  try {
    await createFile(makeArticlePath({arg: id, POSTFIX:DIR.MDXDOWN_POSTFIX}), markdown);   
    return { message: 'Markdown created successfully!', id };
  } catch {
    console.log(`Error: at Creating MarkDown, ${id}`)
    return { message: 'Error Creating markdown file', status: 409}
  }
};

export const readMarkdown = async (id) => {
  try {
      return { 
        message: 'Found markdown file', 
        markdown: await readFile(makeArticlePath({arg: id, POSTFIX: DIR.MDXDOWN_POSTFIX}))
      }
  } catch (error) {
      console.log(`Error: at Creating MarkDown, ${id}`)
      return { message: 'Error reading markdown file', status: 404}
  }
};

export const updateMarkdown = async (id, markdown) => {
  try {
    await  updateFile(makeArticlePath({arg: id, POSTFIX:DIR.MDXDOWN_POSTFIX}), markdown);
    return { message: 'Markdown updated successfully!' };
    
  } catch {
    return { message: 'Markdown not found', status: 404 };
  
  }
};

export const deleteMarkdown = async (id) => {
  const filePath = path.join(articlesDir, `${id}.mdx`);

  if (await fs.pathExists(filePath)) {
    await fs.remove(filePath);
    return { message: 'Markdown deleted successfully!' };
  }

  return { message: 'Markdown not found', status: 404 };
};
