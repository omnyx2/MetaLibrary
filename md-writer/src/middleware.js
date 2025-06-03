import { NextResponse } from 'next/server'
import { match } from 'path-to-regexp'
import { cookies } from 'next/headers'

const matchersForAuth = [
  '/dash/',
  '...'
]
const matchersForSignIn = [
  '/signup/*', 
  '/signin/*'
]
export async function middleware(request) {
  // 인증이 필요한 페이지 접근 제어!
  if (isMatch(request.nextUrl.pathname, matchersForAuth)) {
    return (await getSession()) // 세션 정보 확인
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/signin', request.url))
      // : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
  }
  // 인증 후 회원가입 및 로그인 접근 제어!
  const cookieStore = cookies();
  console.log("hi",cookieStore)
  const accessToken = "a";
  const sessionToken =
    cookies().get('__Secure-authjs.session-token')?.value ||
    cookies().get('authjs.session-token')?.value ||
  '';
  
  console.log("nothi",sessionToken)
  // const res = await fetch(`${process.env.HEROPY_API_URL}/banks/account`, {
  const res = await fetch(`http://localhost:3000/banks/account`, {
  method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: 'HEROPY',
      Authorization: `Bearer ${sessionToken}`
    }
  })
  console.log("uath", res);

  return NextResponse.next()
}

// 경로 일치 확인!
function isMatch(pathname, urls) {
  return urls.some(url => !!match(url)(pathname))
}
