// pages/api/config.js
import { NextResponse } from 'next/server';

let configState = null;

export async function GET() {
  if (!configState) {
    // Simulate fetching configuration from a file or database
    configState = {
      topics: ['technology', 'science', 'sports', 'entertainment'],
    };
  }
  return NextResponse.json(configState);
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
