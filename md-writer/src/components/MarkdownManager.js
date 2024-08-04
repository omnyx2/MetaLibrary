'use-client'
import React, { useState, useEffect } from 'react';
import MarkdownEditor from './MarkdownEditor';
import ConfigSelector from '@/components/TopicSelector/TopicSelector';

const MarkdownManager = ({articleId}) => {
  const [markdowns, setMarkdowns] = useState([]);
  const [currentMarkdown, setCurrentMarkdown] = useState('# ');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMarkdowns();
    if(!!articleId) {
      fetchInitMarkdown(articleId);
    }
  }, []);

  const fetchInitMarkdown = async () => {
    const response = await fetch('/api/markdown?id='+editId);
    const result = await response.json();
    console.log(result)
    setCurrentMarkdown(result);
  };

  const fetchMarkdown = async (id) => {
    const response = await fetch('/api/markdown?id='+id);
    const result = await response.json();
    return result
  };
  
  const fetchMarkdowns = async () => {
    const response = await fetch('/api/markdowns/');
    const result = await response.json();
    console.log(result)
    setMarkdowns(result);
  };

  const createMarkdown = async () => {
    const response = await fetch('/api/markdown', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markdown: currentMarkdown }),
    });
    const result = await response.json();
    setMessage(result.message);
    if(result.id !== null) {
      const prev = fetchMarkdown(result.id);
      setEditId(result.id);
    } else {

    }
    // fetchMarkdown();
    console.log(result);
    // setCurrentMarkdown('');
  };

  const updateMarkdown = async () => {
    console.log(editId, currentMarkdown)
    const response = await fetch('/api/markdown', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, markdown: currentMarkdown }),
    });

    const result = await response.json();
    console.log(result)
    setMessage(result.message);
    // fetchMarkdowns();
    // setCurrentMarkdown('');
  };

  const deleteMarkdown = async (id) => {
    const response = await fetch('/api/markdown', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    setMessage(result.message);
    // fetchMarkdowns();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMarkdown();
    } else {
      createMarkdown();
    }
  };

  const handleEdit = (markdown) => {
    console.log(markdown)
    setCurrentMarkdown(markdown.markdown);
    setEditId(markdown.id);
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
         <ConfigSelector configName="topics"/>
        <MarkdownEditor value={currentMarkdown} setValue={setCurrentMarkdown} />
        <button type="submit">{editId ? '문서 생성' : 'Create'}</button>
      </form>
      {message && <p>{message}</p>}

      <ul>
        {markdowns.map((markdown) => (
          <li className='flex w-full justify-between border-bottom-1' key={markdown.id}>
            <pre className='w-[76%] pl-10'>{markdown.title}</pre>
            <button onClick={() => handleEdit(markdown)} className=''>불러오기</button>
            <button className='w-auto pr-10' onClick={() => deleteMarkdown(markdown.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkdownManager;
