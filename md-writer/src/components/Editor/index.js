'use client'
 
import { useState, useEffect } from "react";
import MarkdownManager from '../MarkdownManager'
import TopicSeletor from '../ListSelector/ListSelector';

function Editor() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookList,setBookList] = useState();
  const [curBook, setCurBook] = useState(undefined);
  const [topics, setTopics] = useState(undefined)
  const [curTopic, setCurTopic] = useState(undefined);

  useEffect(() => {
    fetchBookList()
  }, []);
  useEffect(() => {
    if(curBook){
      fetchTopics()
    }
  }, [curBook]);
  
  const fetchBookList = async () => {
    const response = await fetch('/api/books/');
    const result = await response.json();
    setBookList(result.books);
  };
  const fetchTopics = async () => {
    console.log('/api/topics?booktitle='+curBook)
    const response = await fetch('/api/topics?title='+curBook);
    const result = await response.json();
    setTopics(result.topics);
  };

  return (
    <div className="h-[90vh]" >
      {
        bookList && <TopicSeletor curItem={curBook} curList={bookList} label={"Select the book you want to write"} setCurItem={(e) => setCurBook(e)} />
      }
      {
        topics && <TopicSeletor curItem={curTopic} curList={topics} label={"Select the topic you want to write"} setCurItem={(e) => setCurTopic(e)} />
      }
       <MarkdownManager 
        bookTitle={curBook}
        topic={curTopic}
        editable={false}
      />
    </div>
  );
}

export default Editor;
