// 설계 규칙
// format은 버젼이 명시되어야하며 상위의 버전은 항상 하위의 버전을 포함할수 있어야한다.
// 이름은 유일하고 우아해야한다.
// dubiln core를 참조하도록한다.
// 아직 완성 안됨 더 많이 개발 해야함.
import fs from 'fs-extra';
import path from 'path';
import { getTitleFromMarkDownOnly } from "@/utils/takeHeadersAsTitle"
import DIR from './dir.json';  
import { updateMetaFile } from '@/utils/fsUtils/metadata';
import { getFirstLineMax20Chars } from '@/utils/takeHeadersAsTitle'
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
// update시 타이틀 공백 수정 필요함.
// update시 commit로직빠짐 해당 로직 채울것,
// update 실패시 롤백 로직 없음
// create 실패시 클린업 로직 만들것

const metaFunction = {
    version: () => '1.0',
    bookTitle: (v) => v,
    title: (v) => getTitleFromMarkDownOnly(v),
    getDate: () => new Date().toLocaleDateString('en-US', options),
    creator: (v) => v,
    ownerGroup: (v) => v,
    identifier: (v) => v,
    addContributor: (v, arr) =>  arr.indexOf(v) === -1 ? [...arr, v] : arr
}

const metaDataGen_v_0 = (v, creator, identifier, topic, bookTitle) => ({
    version: metaFunction.version(),
    title: metaFunction.title(v),
    date: metaFunction.getDate(),
    creator: metaFunction.creator(creator),
    contributor: metaFunction.addContributor(creator,[]),
    identifier,
    bookTitle,
    topic,
    dateIssued: metaFunction.getDate(),
})

const metaDataUpdate_v_0 = ({ metadata, markdown, username}) => ({
    version: metaFunction.version(),
    contributors: metaFunction.addContributor(username, metadata.contributors),
    title: metaFunction.title(markdown),
    dateIssued: metaFunction.getDate(),
})

// Define the Dublin Core format
const dublinCorePageFormat = {
    title: "",
    creator: "",
    subject: "",
    description: "",
    publisher: "",
    contributors: [],
    date: "",
    bookType: "",
    format: "",
    identifier: "",
    source: "",
    language: "",
    relation: "",
    coverage: "",
    rights: "",
    topic:"",
};


// Function to create metadata for an MDX file and output it as JSON
export const createBookMetaData = ({ identifier, creator, markdown, topic, bookTitle }) => {
    const metadata = metaDataGen_v_0(markdown, creator, identifier, topic, bookTitle);
    return { ...dublinCorePageFormat, ...metadata };
 
};

export const updateBookMetaDataPipe = async (props) => {
        // 여기서 데이터 타입 에러나는거 터트리면 잡아내는 로직이 없음 동일하지 않은 metadata format이 올때 어떻게 처리할껏임?

    try {
        if(props.result.status !== 200) throw Error("Error Found before updateBookMetaDataPipe")
        const { metadata, markdown, username } = props;
        // console.log("hi", metadata, markdown);
        const newMetadata = await metaDataUpdate_v_0({ metadata, markdown, username: "admin" })
        // console.log("hi2",props);
        return {
            ...props,
            newMetadata: { ...props.metadata, ...newMetadata },
            result: {
                message: "Successfully update Metadata from id",
                status: 200
            }
        }
    } catch(err) {
        console.error("Fail to Found updateBookMetaDataPipe from id", err, props)
        return {
            ...props,
            metadata,
            result: {
                message: "Fail to Found updateBookMetaDataPipe from id",
                status: 403
            }
        }
    }
}

export const saveMetaDataPipe = async (props) => {
    try {
        if(props.result.status !== 200) throw Error("Error Found before updateBookMetaDataPipe")
        const { newMetadata, identifier } = props;
        const result = await updateMetaFile(identifier, newMetadata)
        // console.log(newMetadata);
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