
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { pipe } from '@/utils/pipe/pipe'
import { addCommitPipe, newCommit } from '@/utils/historyManager';
import { createMarkdown, updateMarkdownPipe, readMarkdownFromIdPipe, readMarkdown } from '@/utils/fsUtils/markdown';
import { createArticle, updateArticlePipe, readArticles } from '@/utils/fsUtils/article';
import { getFirstLineMax20Chars } from '@/utils/takeHeadersAsTitle'
import { createMetaFile, readMetaData } from '@/utils/fsUtils/metadata';
import { updateBookMetaDataPipe, saveMetaDataPipe } from '@/metacatologknologe/metafunctions'
// export async function POST(request) {
//   const data = await request.json();

//   // For simplicity, we'll just log the received markdown to the console
//   // In a real application, you might save it to a database
//   console.log('Received Markdown:', data);
  
//   return NextResponse.json({ message: 'Markdown saved successfully!' });
// }

// Create (POST)
export async function POST(request) {

  // 토큰 받아서 만드는 로직 만들것
  let { bookTitle, topic, markdown } = await request.json();
  if( !(bookTitle && topic && markdown)) {
    return NextResponse.json({ message: 'Please choose Book Title, Topic, Write Markdown in it.'}, {status:403});
  }
  if(topic === "/") topic = ""
  // vaildation 로직을 추가를 해줘야하는데 어디에 어떤 항목을 해줘야 하나에 대해서 아직 명료하지 않은 기분이다.
  // metafile을 생성할때 vaildation을 넣어줘야하는가 ? 아니면 파일을 저장할때 넣어줘야하는가 ?
  // 

  // Template 프로젝트에 파일을 넣어준다.
  const result = await createMarkdown(markdown);
  const result3 = await createMetaFile({ identifier: result.id, bookTitle, topic, creator: "admin", markdown });
  const result0 = getFirstLineMax20Chars(markdown);
  const result2 = await createArticle(bookTitle, topic, result0.title, markdown);

  if(result2.status === 409 || result.status !==200) {
    // d실패로 인해서 해당 로직으로 진입시 그전의 요소 전부 삭제하는 것 만들 것,
    NextResponse.json({ message: 'Markdown created failed!', id: result.id }, {status: 403});
  }

  await newCommit(result.id, markdown, "New");
  return NextResponse.json({ message: 'Markdown created successfully!', id: result.id });
}

// Read (GET)
export async function GET(props) {
  try {
     // 허허 뭔가 파씽이 갑자기 안되서 로우하게 조졌습니다.
      const parsedUrl = new URL(props.url);
      const id = parsedUrl.searchParams.get('id');
      const markdown = await readMarkdown(id);
      return NextResponse.json({ id, markdown });
  
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return NextResponse.json({ message: 'Error reading markdown file' }, { status: 404 });
  }
}



// Delete (DELETE)
export async function DELETE(request) {
  const { id } = await request.json();
  markdowns = markdowns.filter((item) => item.id !== id);
  return NextResponse.json({ message: 'Markdown deleted successfully!' });
}


export async function PUT(request) {
  try {
    const { id, markdown } = await request.json();
    const username = "test"
    const now = new Date().toISOString()
    const processedData = await pipe(
      readMarkdownFromIdPipe,
      addCommitPipe,
      findMetaDataFromIdPipe,
      updateBookMetaDataPipe,
      saveMetaDataPipe,
      updateMarkdownPipe,
      updateArticlePipe,
       // Add more processing functions as needed
    )({
      identifier: id,
      markdown,
      username ,
      commitMessage: now + username,
    });
    console.log(processedData)

    const { bookTitle, topic, title, identifier } = processedData.newMetadata
    const message = `Succesfully updated the post! ${ bookTitle}/${topic+"/"+ title} at ${now}, \n  DOI:< ${id} >\n`
    if(processedData.result.status === 200) {
      return NextResponse.json({ message },{status:200});
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update article' },
        { status: 500 }
      );
    }
    // const updatedArticle = await processUpdate(req);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

const findMetaDataFromIdPipe = async (props) => {
  try {
    if(props.result.status !== 200) throw Error("Error Found before findMetaDataFromId")
    const { identifier } = props;
    const oldMetadata = await readMetaData({ identifier })
    console.log("test", oldMetadata)
    return {
      ...props,
      metadata: oldMetadata.status === 200? oldMetadata.data : undefined,
      result: {
        message: "Successfully Found Metadata from id",
        status: 200
      }
    }
  } catch(err) {
    console.error(err, props)
    return {
      ...props,
      result: {
        message: "Fail to Found Metadata from id",
        status: 403
      }
    }
  }
}

