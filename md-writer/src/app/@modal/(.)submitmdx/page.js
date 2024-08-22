
"use client"
import { Modal } from './modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFirstLineMax20Chars } from '@/utils/takeHeadersAsTitle';
import { createMarkdownAPI } from '@/components/Editor/editorApis'
// 순서
// 어떠한 조건을 통과하지 못해 제출자체가 불가능한 경우
// 어떠한 조건을 통과해서 제출이 가능한 경우
// 제출이 새로운 생성인 경우
// 제출이 새로운 생성이 아닌 경우
 
const SubmissionComponent = ({ isEditing, initialData, onSubmit }) => {
 
  const [conditionMet, setConditionMet] = useState(false);
  const [data, setData] = useState(initialData || {});
  const router = useRouter()
  // 예시 조건: 모든 필수 입력 필드가 채워졌는지 확인
  const id = localStorage.getItem("id") || false;
  const markdown = localStorage.getItem("markdown") || false ;
  const topic = localStorage.getItem("topic") || false;
  const bookTitle = localStorage.getItem("bookTitle") || false;

  useEffect(() => {
    // 조건을 평가하는 로직 (예: 필수 입력 필드가 채워졌는지 확인)
    const checkCondition = () => {
      const condition = !((markdown.length < 50) && topic && bookTitle); // 필요에 따라 변경
      console.log(markdown.length,topic,bookTitle, condition);
      setConditionMet(condition);
    };
    checkCondition();
  }, [markdown]);

  const handleSubmit = async () => {
    if (!conditionMet) {
      router.back()
      return;
    }

    if (isEditing) {
      // 기존 데이터 수정 로직
      console.log("기존 데이터를 수정합니다:", data);
      // onSubmit 함수 호출로 수정 작업 실행
      // onSubmit(data, "edit");
    } else {
      // 새로운 데이터 생성 로직
      const result = await createMarkdownAPI({currentMarkdown:markdown,  bookTitle, topic})
      console.log("새로운 데이터를 생성합니다:", result);
      router.back()
    }

    // 제출 후 페이지 이동 또는 모달 닫기

  };

  return (
    <div className='flex m-10  '>
      <div className='flex justify-center flex-col '>
      <div >
        <div className='mt-2 text-sm text-gray-500 '>
          <label>BookTitle: "{bookTitle}"</label>
         
        </div>
        <div className='mt-2 text-sm text-gray-500 '>
          <label>Topic: "{topic}"</label>
        
        </div>
        <div className='mt-2 text-sm text-gray-500 '>
          <label>Title: {getFirstLineMax20Chars(markdown).title} / total letter: {markdown.length}</label>
           
        </div>
     
      </div>
      {
          conditionMet ?
          <button  
            className='mt-2 text-sm  bg-blue-400 transition-all ease-out duration-300 hover:bg-blue-800 text-white p-2'
            onClick={handleSubmit}
            disabled={!conditionMet}>
            {isEditing ? "Update Page" : "Publish New Page"}
          </button>
          :
          <button className='mt-2 text-sm text-gray-500' onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            글이 너무 짧거나 어디에 작성할 것인지 정리되지 않았습니다. 다시 작성해 주세요. 
          </button>
        }
    
      </div>
      
    </div>
  );
};

export default function UserManualModal() {
  return <Modal><SubmissionComponent/></Modal>;
}