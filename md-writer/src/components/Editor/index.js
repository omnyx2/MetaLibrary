'use client'
 
import { useState, useEffect } from "react";
import MarkdownManager from '../MarkdownManager'
import TopicSeletorToggle from '../ListSelectorToggle/ListSelector';
import config from "../../../postcss.config.mjs";

function Editor() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookAndTopicList,setBookAndTopicList] = useState([]);
  const [curBook, setCurBook] = useState(undefined);
  const [curBookAndTopic, setCurBookAndTopic] = useState(undefined)
  const [curTopic, setCurTopic] = useState(undefined);
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    fetchAllTopics() 
  }, []);
  useEffect(() => {
    setBookAndTopicList(buildSDoubleSelection(configs));

  }, [configs]);
  useEffect(()=> {
    console.log(curBookAndTopic)
  },[curBookAndTopic])

  const fetchAllTopics = async () => {
    const response = await fetch('/api/all-topics');
    const result = await response.json();
    
    const data = []
    result.allTopics.map((description)=> {
      console.log(description)
      data.push([description.bookTitle,'/'])
      description.topics.map((item) =>  data.push([description.bookTitle, item]))
    })
    setConfigs(data);
  };

  function buildSDoubleSelection(arr){
    if(!arr) return [];
    return arr.map(([oI,tI]) => `${oI} -> ${tI}`);
  }
  function handleDoubleSelection(item){
    setCurBookAndTopic(item);
    const idx = bookAndTopicList.indexOf(item);
    setCurBook(configs[idx][0])
    setCurTopic(configs[idx][1])
  }

  return (
    <div className="h-[80vh]" >
        {
          configs && <TopicSeletorToggle
            curItem={ curBookAndTopic } 
            curList={ bookAndTopicList }
            label={""} 
            setCurItem={(e) => handleDoubleSelection(e)} />
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
