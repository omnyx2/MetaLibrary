'use client'
 import { useState, useEffect } from "react";
import AuthForm from '../components/AuthForm'
import MarkdownManager from '../components/MarkdownManager'
import Editor from '../components/Editor'
import { useSearchParams } from 'next/navigation'

const searchMetadata = async (conditions) => {
  const response = await fetch('/api/metadatas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conditions: conditions
    }),
  });
  const result = await response.json();
  
  return result
};

function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchParams = useSearchParams()
  // http://localhost:3000/?bookTitle=etsts&title=fasdfasfd&topic=fsadfasdf
  const bookTitle = searchParams.get('bookTitle')
  const title = searchParams.get('title')
  const topic = searchParams.get('topic')


  useEffect(() => {
    console.log( bookTitle,
      title,
      topic)
    if ( bookTitle && title && topic) {
 
      console.log(searchMetadata({
        bookTitle,
        title,
        topic
      }))
    }

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw]" >
      { isLoggedIn ?  <Editor /> : <AuthForm />}
    </div>
  );
}

export default HomePage;


