// pages/api/config.js
import { NextResponse } from 'next/server';
import path from 'path'
import fs from 'fs'
import { getBooksTitle } from '@/utils/checker/books';

export async function GET() {
  const config = await getBooksTitle();
  console.log(config)
  if (!config) {
     return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }

  return NextResponse.json({books: config}, { status: 200});
}
