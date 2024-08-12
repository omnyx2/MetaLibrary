import fs from 'fs-extra';
import path from 'path';
import DIR from './dir.json'
  // const ARTICLESDIR = path.join(process.cwd(), '../nextra-docs-template/pages/SLAM');
// const articlesDir = ARTICLESDIR
import { readDirWithConditions, readFile } from './fileReader';

function makeMetaFilePath({ arg="", POSTFIX = ""}) {
  return path.join(process.cwd(), DIR.META_FILE_PATH + arg + POSTFIX);
}

// simple search options
export const containsAllKeyValuePairs = ({searchProps, obj}) => {
  return Object.entries(searchProps).every(([key, value]) => {
    return obj.hasOwnProperty(key) && obj[key] === value;
  });
};

// 이거 searchProps의 요소가 undefined면 어떻게 에러처리해야하는지 들어가 있지 않아서 곧 해야할듯,
export const hitMetaDataWithId = async ({ identifier, searchProps, serachFn}) => {
  
  const metadataPath = await path.join(DIR.META_FILE_PATH, identifier+DIR.META_FILE_FULL_POSTFIX);
  try {
    const metadata = await JSON.parse(await readFile(metadataPath));
    if (await serachFn({searchProps, obj: metadata})) {   
      return {
        message: "Successed to find meta data",
        status: 200,
        data: {...metadata}
      }
    } else {
      return {
        message: "Nothing found from metadatas",
        status: 200,
        data: undefined
      }
    }
  } catch (error){
    console.error(`${metadataPath} is not vaild type delete please`)
    return {
      message: "Nothing found from metadatas",
      status: 404,
      data: undefined
    }
  }
}

export const searchMetaDatas = async ({ searchProps, serachFn }) => {
  try {
    const fileList = await readDirWithConditions(DIR.META_FILE_PATH, file => file.endsWith('-meta.json')); 
     const promises = fileList.map(async name => {
      const result = await hitMetaDataWithId({
        identifier: path.basename(name, DIR.META_FILE_FULL_POSTFIX),
        searchProps,
        serachFn
      })
      if( result.data && result.status === 200) { return {...result.data} }
      return undefined;
    });

    const resultData = (await Promise.all(promises)).filter(Boolean);
    console.log(resultData)
    if(resultData.length > 0) {
      return {
        message: "Successed to find meta data",
        status: 200,
        data: resultData
      }
    } else {
      return {
        message: "Nothing founded ...",
        status: 404,
        data: undefined
      }
    }
 } catch (error) {
  console.log(error)
  return {
     message: "Failed to find the meta data, Somthing wrong",
     stauts: 403
   }
 }
}