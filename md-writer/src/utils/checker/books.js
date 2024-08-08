import fs from 'fs-extra';
import path from 'path';

const booksConfigs = path.join(process.cwd(), '../metaconfigs/book/config.json');

const readJsonFile = async () => {
    const fileContents = await fs.readFileSync(booksConfigs, 'utf8');
    return JSON.parse(fileContents);
  };

// json 데이터로 부터 키를 추출한다.
const extractKeys = (jsonData) => {
    const result = [];
    jsonData.forEach(item => {
        const key = Object.keys(item)[0];
        result.push(key);
        });

    return result;
};

export const getBooksTitle = async ( ) => {
  return await extractKeys(await readJsonFile())
}