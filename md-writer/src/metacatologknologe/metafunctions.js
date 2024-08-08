// 설계 규칙
// format은 버젼이 명시되어야하며 상위의 버전은 항상 하위의 버전을 포함할수 있어야한다.
// 이름은 유일하고 우아해야한다.
// dubiln core를 참조하도록한다.
// 아직 완성 안됨 더 많이 개발 해야함.
import fs from 'fs-extra';
import path from 'path';
import { getTitleFromMarkDownOnly } from "@/utils/takeHeadersAsTitle"
import DIR from './dir.json';  

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const metaFunction = {
    version: () => '1.0',
    bookTitle: (v) => v,
    title: (v) => getTitleFromMarkDownOnly(v),
    getDate: () => new Date().toLocaleDateString('en-US', options),
    creator: (v) => v,
    ownerGroup: (v) => v,
    identifier: (v) => v,
}

const metaDataGen_v_0 = (v, creator, identifier, bookTitle) => ({
    version: metaFunction.version(),
    title: metaFunction.title(v),
    date: metaFunction.getDate(),
    creator: metaFunction.creator(creator),
    identifier,
    bookTitle,
    dateIssued: metaFunction.getDate(),
})

// Define the Dublin Core format
const dublinCoreFormat = {
    title: "",
    creator: "",
    subject: "",
    description: "",
    publisher: "",
    contributor: "",
    date: "",
    type: "",
    format: "",
    identifier: "",
    source: "",
    language: "",
    relation: "",
    coverage: "",
    rights: ""  
};

// Function to create metadata for an MDX file and output it as JSON
export const createBookMetaData = ({ identifier, creator, markdown, bookTitle }) => {
    const metadata = metaDataGen_v_0(markdown, creator, identifier, bookTitle);
    return { ...dublinCoreFormat, ...metadata };
 
};