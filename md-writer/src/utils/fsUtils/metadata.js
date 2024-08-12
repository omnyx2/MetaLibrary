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
  return path.join(process.cwd(), DIR.META_FILE_PATH + arg + POSTFIX);
}
``
export const createMetaFile = async ({ identifier, bookTitle, topic, creator, markdown}) => {
  try {
    const metaData = await createBookMetaData({ identifier, bookTitle, topic, creator, markdown })
    const metaPath = await makeMetaFilePath({arg: identifier+"-meta", POSTFIX:DIR.META_FILE_POSTFIX})
    await createFile(
      metaPath,
      JSON.stringify(metaData) 
    );   

    return { message: 'MetaFile created successfully!', id: identifier, status: 200 };

  } catch (err){

    console.log(`Error: at Creating MetaFile, ${identifier} ${err}`)
    return { message: 'Error Creating MetaFile file', status: 409}
  }
};

export const updateMetaFile = async (identifier, metadata) => {
  try {
    // console.log("updating: ");
    const metaPath = await makeMetaFilePath({arg: identifier , POSTFIX:DIR.META_FILE_FULL_POSTFIX})
    
    await updateFile(metaPath, JSON.stringify(metadata));
    // console.log(metaPath);
    return { message: 'MetaFile updated successfully!', status: 200  };
  } catch {
    return { message: 'MetaFile not found', status: 404 };
  }
};

export const readMetaData = async ({ identifier }) => {
  try {
    const filePath = await makeMetaFilePath({arg: identifier, POSTFIX: DIR.META_FILE_FULL_POSTFIX})
    console.log(filePath)
    const data = JSON.parse(await readFile(filePath));
    return {
      message: "Successed to find meta data",
      status: 200,
      data
    }
  } catch (error) {
    return {
      message: "Failed to finde the meta data, Somthing wrong",
      error,
      stauts: 403
    }
  }
} 

export const searchMetaData = async(keys) => {
  try {

  } catch {
    
  }
}