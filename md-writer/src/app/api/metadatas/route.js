import { searchMetaDatas, containsAllKeyValuePairs } from '@/utils/fsUtils/metadatas'
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { conditions } = await request.json();
    console.log(conditions) // conditinos로 들어오는 것은 vaild 하다고 믿어야한다. ㅋㅋ..
    const result = await searchMetaDatas({ 
      serachFn: containsAllKeyValuePairs,
      searchProps: conditions
    });
 
    if(result.data && result.data.length > 0 ) {
      return NextResponse.json({ message: 'Successfully Searched Data!', data: result.data[0] }, {status:200}); 
    }
    if(result.status === 404 ) {
      return NextResponse.json({ message: 'No matched Data!', data: result.data[0] }, {status:200}); 
    }
    return NextResponse.json({ message: 'Error! Invailed Data', data: result.data[0] }, {status:404}); 
}
  