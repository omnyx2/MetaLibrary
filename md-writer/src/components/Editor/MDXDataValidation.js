import TitleHeader from '../TitleHeader'
import dynamic from 'next/dynamic'
import '@mdxeditor/editor/style.css'
// Markdown Editor쪽에서 데이터 관리 및 인코딩 및 적합성 관리
const MDXEditor = dynamic(() => import('../MDXEditor/MDXEditor'), { ssr: false })

function isEnglish(text) {
  // This regex matches basic Latin characters, numbers, and common punctuation
  const englishRegex = /^[#| |A-Za-z0-9\s."-]+$/;
  console.log(text, englishRegex.test(text))
  return englishRegex.test(text);
}
const isInvolvedSpecialChar = (firstLine) => {
  const englishRegex = /[!@#$%^&*?)(]/g;
  console.log(firstLine, "::t", englishRegex.test(firstLine))
  return !englishRegex.test(firstLine) // Remove special characters
};

function getTitleOnly(value) {
  return value.split('\n')[0].slice(2,-1)
}

function checkTitleIsEnglish(value) {
  const firstLine = value.split('\n')[0];
  if(firstLine.length < 4) return true; // "# a" 여까지 입력할때 문제업게
  const title = firstLine.slice(2,-1);
  return isEnglish(title) && isInvolvedSpecialChar(title)
}



function MarkdownEditor({ value, setValue, ref }) {
  function handleSetValue (value) {
   console.log(value)
    // if(value[0] !== "#" ) {
    //   alert("1. Type # at first, #을 쳐주세요!")
    //   if(value[1] !== " " ) alert("2. Make a space with #, #에서 한칸 떄주세요")
    // }
    // if(!checkTitleIsEnglish(value)) {
      
    //   alert("3. Title Should be english, 제목은 무조건 영어이어야 합니다. \n 4. 제목의 특수문자 또한 절대로 허용되지 않습니다")
    // }
    setValue(value)
  }
  
  return (
    <div data-color-mode="light" className="h-[90vh]"  >
      <TitleHeader title={() => getTitleOnly(value)} toggle={ value.split('\n').length > 1 }/>
      <MDXEditor ref={ref} markdown={value} handleOnChange={handleSetValue} />
    </div>
  );
}
export default MarkdownEditor;
