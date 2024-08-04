
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createMarkdown, updateMarkdown, readMarkdownDOIs } from '@/utils/fsUtils/markdown';

// export async function POST(request) {
//   const data = await request.json();

//   // For simplicity, we'll just log the received markdown to the console
//   // In a real application, you might save it to a database
//   console.log('Received Markdown:', data);
  
//   return NextResponse.json({ message: 'Markdown saved successfully!' });
// }

// Create (POST)
export async function POST(request) {
  const { markdown } = await request.json();
  const result = await createMarkdown(markdown);
  return NextResponse.json({ message: 'Markdown created successfully!', id: result.id });
}

// Read (GET)
export async function GET() {
  const markdowns = await readMarkdownDOIs();
  return NextResponse.json(markdowns);
}

export async function PUT(request) {
    const { id, markdown } = await request.json();
    console.log(id);
    const markdowns = await readMarkdowns();
    // console.log(markdowns);
    const index = markdowns.findIndex((item) => {
      console.log(item);
      return item.id === id
    });
    console.log("index",index)
    if (index !== -1) {
        markdowns[index].markdown = markdown;
        return NextResponse.json({ message: 'Markdown updated successfully!' });
    }

    const result = await updateMarkdown(id, markdown);
    if (result.status === 404) {
      return NextResponse.json(result, { status: 404 });
    }
    return NextResponse.json(result);
}

// Delete (DELETE)
export async function DELETE(request) {
  const { id } = await request.json();
  markdowns = markdowns.filter((item) => item.id !== id);
  return NextResponse.json({ message: 'Markdown deleted successfully!' });
}