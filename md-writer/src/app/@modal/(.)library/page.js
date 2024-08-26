"use client";
import { useState, useEffect } from "react";
import { fetchMarkdowns, fetchInitMarkdown, handleSubmit, handleEdit } from "../../../components/Editor/EditorHooks";
import { Modal } from './modal';
const LibraryPage = () => {
  const [markdowns, setMarkdowns] = useState([]);
  useEffect(() => {
    fetchMarkdowns(setMarkdowns);
    //여기서 이걸 상상을 못했네 어떤 다른 마크다운을 가져와서 갱신할려면 이걸 애햐한다....
  });

  return (
    <div className='w-[70vw] h-[70vh]'>
      <ul>
        {
          markdowns.map((markdown) => (
            <li className='flex w-full justify-between border-bottom-1' key={markdown.id}>
              <pre className='w-[76%] pl-10'>{markdown.title}</pre>
              <button onClick={() => handleEdit(markdown)} className=''>불러오기</button>
              <button className='w-auto pr-10' onClick={() => deleteMarkdown(markdown.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default function LibraryModal() {
  return <Modal><LibraryPage/></Modal>;
}