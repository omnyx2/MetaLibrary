import { NextResponse } from 'next/server';

import { readMdxFile, writeMdxFile } from '@/utils/fsUtils/history';

export async function POST(request) {
  try {
    const { content, message } = await request.json();

    const currentContent = await readMdxFile();
    const commitId = await addCommit(currentContent, content, message);
    await writeMdxFile(content);

    return NextResponse.json({ message: 'MDX file updated and history saved', commitId });
  } catch (error) {
    console.error('Error updating MDX file:', error);
    return NextResponse.json({ message: 'Error updating MDX file' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const history = await getHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error reading history:', error);
    return NextResponse.json({ message: 'Error reading history' }, { status: 500 });
  }
}