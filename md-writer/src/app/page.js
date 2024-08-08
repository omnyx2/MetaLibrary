'use client'
 
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import AuthForm from '../components/AuthForm'
import MarkdownManager from '../components/MarkdownManager'
import Editor from '../components/Editor'
 
function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    
    <div className="h-[90vh]" >
      { isLoggedIn ?  <Editor /> : <AuthForm />}
    </div>
  );
}

export default HomePage;


