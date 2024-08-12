import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import DIR from './dir.json'
import { updateFile, createFile, deleteFile } from './fileReader';
import { getFirstLineMax20Chars } from '@/utils/takeHeadersAsTitle'
const ARTICLESDIR = path.join(process.cwd(), '../library/books/book-')
const PREFIX='/pages/';

const makeArticleTemplatePath = ({ bookTitle, topic="/", title}) => {
   try {
    const _path = path.join(
      process.cwd(), 
      DIR.IMPL_ARITCLE_PATH+bookTitle,
      PREFIX,
      topic,
      title+DIR.ARTICLE_POSTFIX);
      console.log("HI", _path)
      return _path
  } catch(err) {
     console.log(err)
  }

}

const checkDuplicateTitle = async (booktitle, topic) => {
  const files = await fs.readdir(ARTICLESDIR+booktitle+PREFIX+topic);
 
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
      console.log("Dupilcation", id, booktitle)
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

export const updateArticle = async ({ metadata, newMetadata, markdown }) => {
  const { bookTitle, topic, title } = metadata;
  const properTitle = getFirstLineMax20Chars(title)
  const _path = await makeArticleTemplatePath({  bookTitle, topic, title: properTitle })
  
  if(metadata.title === newMetadata.title) {
    await updateFile(_path, JSON.stringify(markdown));
  
  } else {
    const { bookTitle, topic, title } = newMetadata;
    const _newPath = await makeArticleTemplatePath({ bookTitle, topic, title })  
    await createFile(_path, JSON.stringify(markdown));
    await deleteFile(_path);
  }
  return {message: "update Article safly", status: 200}
}

export const updateArticlePipe = async (props) => {

  try {
    if(props.result.status !== 200) throw Error("Error Found before updateBookMetaDataPipe")
      const { metadata, newMetadata, markdown } = props
      await updateArticle({ metadata, newMetadata, markdown })
      return {
        ...props,
        result: {
            message: "Article updated successfully!",
            status: 200
        }
      }
    
  } catch(err) {
    console.error("Error at updateArticlePipe", err)
    return {
      ...props,
      result: {
          message: "Fail to Update Article file",
          status: 403
      }
    }
  }
};

export const saveMetaDataPipe = async (props) => {
  try {
      if(props.result.status !== 200) throw Error("Error Found before updateBookMetaDataPipe")
      const { newMetadata, identifier } = props;
      const result = await updateMetaFile(identifier, newMetadata)
       return {
          ...props,
          result: {
              message: "Successfully update Metadata file",
              status: result.status
          }
      }
  } catch(err) {
      console.error(err)
      return {
          ...props,
          metadata,
          result: {
              message: "Fail to Found Metadata file",
              status: 403
          }
      }
  }
}


export const deleteArticle = async (booktitle, topic) => {
  const filePath = path.join(ARTICLESDIR+booktitle+PREFIX+topic+"/", `${articleTitle}.mdx`);

  if (await fs.pathExists(filePath)) {
    await fs.remove(filePath);
    return { message: 'Article deleted successfully!' };
  }

  return { message: 'Article not found', status: 404 };
};
 