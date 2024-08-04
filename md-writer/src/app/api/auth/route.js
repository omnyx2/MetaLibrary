import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, password } = await request.json();

  // Simulate a real authentication check
  if (username === 'admin' && password === 'password') {
    const response = NextResponse.json({ message: 'Login successful!' });
    response.cookies.set('token', 'your-auth-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    return response;
  }
  
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
