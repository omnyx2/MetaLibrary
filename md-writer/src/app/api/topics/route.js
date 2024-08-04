// pages/api/config.js
import { NextResponse } from 'next/server';
import path from 'path'
import fs from 'fs'

export async function GET() {
  const configPath = path.join(process.cwd(), 'public', 'topics/topicList.json');
  const config = await fs.readJson(configPath);

  if (!config) {
     return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }

  return NextResponse.json({config: config}, { status: 200});
}

export async function POST(req) {
  try {
    const body = await req.json();
    configState = body; // Save the configuration
    return NextResponse.json({ message: 'Configuration saved successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }
}
