
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { addCommit, newCommit } from '@/utils/historyManager';
import { createMarkdown, updateMarkdown, readMarkdowns, readMarkdown } from '@/utils/fsUtils/markdown';
import { createArticle, updateArticle, readArticle, readArticles } from '@/utils/fsUtils/article';
import { getFirstLineMax20Chars } from '@/utils/takeHeadersAsTitle'
import { createMetaFile } from '@/utils/fsUtils/metadata';
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
  if( !(bookTitle && topic && markdown)) {
    return NextResponse.json({ message: 'Please choose Book Title, Topic, Write Markdown in it.'}, {status:403});
  }
  // Template 프로젝트에 파일을 넣어준다.
  const result = await createMarkdown(markdown);
  const result3 = await createMetaFile({ identifier: result.id, bookTitle, topic, creator: "admin", markdown });
  const result0 = await getFirstLineMax20Chars(markdown);
  const result2 = await createArticle(bookTitle, topic, result0.title, markdown);

  if(result2.status === 409) {
    // d실패로 인해서 해당 로직으로 진입시 그전의 요소 전부 삭제하는 것 만들 것,
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

export async function PUT(request) {
  
    const { id, markdown, bookTitle, topic } = await request.json();
    const oldMarkdown = await readMarkdown(id);

    const histories = await addCommit(id, oldMarkdown.markdown, markdown, 'Test');
    const result = await updateMarkdown(id, markdown);

    const oldTitle = await getFirstLineMax20Chars(oldMarkdown.markdown);
    const title = await getFirstLineMax20Chars(markdown);

    if( oldTitle === title ) {
      const result2 = await updateArticle(bookTitle, topic, markdown);
    } else {
      const result0 = await getFirstLineMax20Chars(markdown);
      const result2 = await createArticle(bookTitle, topic, result0.title, markdown);
      if(result2.status === 409) {
        return NextResponse.json({ message: 'Title is duplicated', title });
      }
    }
    // else {
      
      // deleteArticle(title);
    // }

    

    if (result.status === 404) {
      return NextResponse.json(result, { status: 404 });
    }
    if (histories.status !== 404) {
      return NextResponse.json({ message: 'Markdown & history updated successfully!' });
    }

    return NextResponse.json(result);  
}

// Delete (DELETE)
export async function DELETE(request) {
  const { id } = await request.json();
  markdowns = markdowns.filter((item) => item.id !== id);
  return NextResponse.json({ message: 'Markdown deleted successfully!' });
}