'use-client'
import React, { useState, useEffect } from 'react';
import MarkdownEditor from '../MarkdownEditor';
import { fetchMarkdowns, fetchInitMarkdown, handleSubmit } from './EditorHooks';




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
      <article className='w-[60rem] pr-2 pl-12'>
        <button onClick={(e) => handleSubmit(e, editId, setEditId, currentMarkdown, bookTitle, topic, setMessage)}>Get markdown</button>
        <MarkdownEditor ref={ref} value={currentMarkdown} setValue={setCurrentMarkdown} />
      </article>
      <div/>

    </div>

  );
};

export default MarkdownManager;
