'use-client'
import React, { useState, useEffect } from 'react';
import MarkdownEditor from './MDXDataValidation';
import { fetchMarkdowns, fetchInitMarkdown, handleSubmit, handleEdit,saveMarkdownFromRefresh } from './EditorHooks';

//Markdown manager에 대해서 여러기타 데이터 상태 관리
const MarkdownManager = ({bookTitle, topic, articleId}) => {
  const [markdowns, setMarkdowns] = useState([]);
  const [currentMarkdown, setCurrentMarkdown] = useState('# ');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const ref = React.useRef(null)

  useEffect(() => {
    fetchMarkdowns(setMarkdowns);
    if(!!articleId) {
      fetchInitMarkdown(setCurrentMarkdown, articleId);
    }
    saveMarkdownFromRefresh(setCurrentMarkdown);
  }, []);

  return (
    <div className='w-[100vw] flex justify-center'>
      {/* <ul>
        {markdowns.map((markdown) => (
          <li className='flex w-full justify-between border-bottom-1' key={markdown.id}>
            <pre className='w-[76%] pl-10'>{markdown.title}</pre>
            <button onClick={() => handleEdit(markdown)} className=''>불러오기</button>
            <button className='w-auto pr-10' onClick={() => deleteMarkdown(markdown.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      <article className='w-[60rem] te pr-2 pl-12'>
        <MarkdownEditor ref={ref} value={currentMarkdown} setValue={ (markdown) => handleEdit(markdown, setCurrentMarkdown, setEditId)} />
      </article>
      <div/>

    </div>

  );
};

export default MarkdownManager;
