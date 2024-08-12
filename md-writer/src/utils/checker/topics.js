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

const extractAllTopics = (jsonData) => {
  const result = []
  jsonData.map(item => {
      return Object.entries(item).map(([key, value]) => {
        result.push({
          bookTitle: key,
          topics: value.topics.tables
        }
      )})
  })
  return result
};

// library 별로 하나씩 소지
export const getAllBookTopics = async () => {
  let jsonData = await readJsonFile()
  return await extractAllTopics(jsonData)
}
export const getBookTopics = async (bookName) => {
  let jsonData = await readJsonFile()
  return await extractTopics(jsonData, bookName)
}