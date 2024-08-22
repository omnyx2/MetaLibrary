'use client'
 
import { useState, useEffect } from "react";
import MarkdownManager from './MDXDataHandler'
import TopicSeletorToggle from '../ListSelectorToggle/ListSelector';
import config from "../../../postcss.config.mjs";
import TogglesContainer from '../TogglesContainer/index';

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
  // 화면 렌더링을 위해서 state에 저장하는 한편 LocalStorage에 저장하여 추후 다른 곳에서 쓸수 이도록하였다.
  // 이는 생각보다 복잡한 구현이므로 추후 전역 관리로 넘기길 바란다.
  function handleDoubleSelection(item){
    setCurBookAndTopic(item);
    const idx = bookAndTopicList.indexOf(item);
    setCurBook(configs[idx][0]);
    setCurTopic(configs[idx][1]);
    localStorage.setItem("topic", configs[idx][1])
    localStorage.setItem("bookTitle", configs[idx][0])
  }

  return (
    <div className="h-full w-full flex justify-center" >
      <TogglesContainer>
        {
          configs && <TopicSeletorToggle
            curItem={ curBookAndTopic } 
            curList={ bookAndTopicList }
            label={""} 
            setCurItem={(e) => handleDoubleSelection(e)} />
        }
      </TogglesContainer>
       <MarkdownManager
        bookTitle={curBook}
        topic={curTopic}
        editable={false}
      />
    </div>
  );
}

export default Editor;
