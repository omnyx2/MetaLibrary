import { NextResponse } from 'next/server';
import { getBookTopics } from '@/utils/checker/topics';


export async function GET(props) {
  // Create a URL object
  const parsedUrl = new URL(props.url);
  // Get the value of the 'title' parameter
  const title = parsedUrl.searchParams.get('title');

  // const { booktitle } = params;
  console.log(title)
  const config = await getBookTopics(title);
  console.log(title)
  if (!config) {
     return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }

  return NextResponse.json({topics: config}, { status: 200});
}
