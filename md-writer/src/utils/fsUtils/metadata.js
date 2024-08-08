import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getTitleFromMarkDownOnly } from '../takeHeadersAsTitle';
import { readFile, createFile, updateFile, readFileList } from './fileReader';
import { createBookMetaData } from '../../metacatologknologe/metafunctions'
import DIR from './dir.json'
 // const ARTICLESDIR = path.join(process.cwd(), '../nextra-docs-template/pages/SLAM');
// const articlesDir = ARTICLESDIR

function makeMetaFilePath({ arg="", POSTFIX = ""}) {
  return path.join(process.cwd(), DIR.META_FILE_PATH) + arg + POSTFIX;
}

export const createMetaFile = async ({ identifier, bookTitle, creator, markdown }) => {
  try {
    const metaData = await createBookMetaData({ identifier, bookTitle, creator, markdown })
    const metaPath = await makeMetaFilePath({arg: identifier+"-meta", POSTFIX:DIR.META_FILE_POSTFIX})
    await createFile(
      metaPath,
      JSON.stringify(metaData) 
    );   

    return { message: 'MetaFile created successfully!', id: identifier, status: 200 };
  } catch {
    console.log(`Error: at Creating MarkDown, ${identifier}`)
    return { message: 'Error Creating markdown file', status: 409}
  }
};

export const updateMetaFile = async (id, metadata) => {
  try {
    await  updateFile(makeMetaFilePath({arg: identifier+"-meta", POSTFIX:DIR.MDXDOWN_POSTFIX}), metadata);
    return { message: 'MetaFile updated successfully!', status: 200  };
    
  } catch {
    return { message: 'MetaFile not found', status: 404 };
  
  }
};
 