'use client'
 
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import AuthForm from '../components/AuthForm'
import MarkdownManager from '../components/MarkdownManager'

function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [value, setValue] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("Idonknwo");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    
    <div className="h-[90vh]" >
      { isLoggedIn ?  <MarkdownManager /> : <AuthForm />}
    </div>
  );
}

export default HomePage;
