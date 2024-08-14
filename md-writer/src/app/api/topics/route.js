import { NextResponse } from 'next/server';
import { getBookTopics } from '@/utils/checker/topics';


export async function GET(props) {
  const config = await getBookTopics();

  if (!config) {
     return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }

  return NextResponse.json({topics: config}, { status: 200});
}
