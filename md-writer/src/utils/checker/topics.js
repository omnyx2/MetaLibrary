import fs from 'fs-extra';
import path from 'path';

const booksConfigs = path.join(process.cwd(), '../metaconfigs/book/config.json');

const readJsonFile = async (filePath) => {
    const fileContents = await fs.readFileSync(booksConfigs, 'utf8');
    return JSON.parse(fileContents);
  };

// json 데이터로 부터 키를 추출한다.
const extractTopics = (jsonData, bookName) => {
    let result = [];
    jsonData.forEach(item => {
        const key = Object.keys(item)[0];
          if(key === bookName) {
            result = item[bookName].topics.tables
          }
        });
    return [...result]
};

export const getBookTopics = async (bookName) => {
  let jsonData = await readJsonFile()
  return await extractTopics(jsonData, bookName)
}