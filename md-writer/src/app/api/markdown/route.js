
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { pipe } from '@/utils/pipe/pipe'
import { addCommit, newCommit } from '@/utils/historyManager';
import { createMarkdown, updateMarkdownPipe, readMarkdowns, readMarkdown } from '@/utils/fsUtils/markdown';
import { createArticle, updateArticlePipe, readArticle, readArticles } from '@/utils/fsUtils/article';
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
  const { bookTitle, topic, markdown } = await request.json();
  console.log(topic)
  if( !(bookTitle && topic && markdown)) {
    return NextResponse.json({ message: 'Please choose Book Title, Topic, Write Markdown in it.'}, {status:403});
  }
  // Template 프로젝트에 파일을 넣어준다.
  const result = await createMarkdown(markdown);
  const result3 = await createMetaFile({ identifier: result.id, bookTitle, topic, creator: "admin", markdown });
  const result0 = await getFirstLineMax20Chars(markdown);
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
    const { id, markdown, username } = await request.json();
    const processedData = await pipe(
      findMetaDataFromIdPipe,
      updateBookMetaDataPipe,
      saveMetaDataPipe,
      updateMarkdownPipe,
      updateArticlePipe,
      addCommitPipe
      // Add more processing functions as needed
    )({
      identifier: id,
      markdown,
      username
    });
    const { bookTitle, topic, title, identifier } = processedData.newMetadata
    const message = `Succesfully updated the post!${ bookTitle}/${topic+"/"+ title} \n ${id} \n ${identifier}`
    console.log(message)
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

