import { NextResponse } from 'next/server';
import { getAllBookTopics } from '@/utils/checker/topics';


export async function GET(props) {
  // Create a URL object
  const parsedUrl = new URL(props.url);
  // Get the value of the 'title' parameter
  const title = parsedUrl.searchParams.get('title');

  // const { booktitle } = params;
  const config = await getAllBookTopics(title);
  console.log(config)
  if (!config) {
     return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }

  return NextResponse.json({allTopics: config}, { status: 200});
}
