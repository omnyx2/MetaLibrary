import { createMarkdownAPI, updateMarkdownAPI, fetchInitMarkdownAPI } from "./editorApis";
export const fetchMarkdown = async (id) => {
    const response = await fetch('/api/markdown?id='+id);
    const result = await response.json();
    return result
};

export const saveMarkdownFromRefresh = async (setCurrentMarkdown) =>{
    const content = await localStorage.getItem("markdown") || false;
    if(!content) setCurrentMarkdown(content)
}

export const createMarkdown = async ({ setEditId, data, setMessage}) => {
    const { currentMarkdown,  bookTitle, topic, } = data
    const result = await createMarkdownAPI({ currentMarkdown,  bookTitle, topic, })
    setMessage(result.message);
    if(result.id !== null) {
      console.log(result)
      const prev = fetchMarkdown(result.id);
      setEditId(result.id);
    }
};
  
export const updateMarkdown = async ({ data, setMessage}) => {
    const { editId, currentMarkdown,  bookTitle, topic} = data
    const result = await updateMarkdownAPI({ editId, currentMarkdown,  bookTitle, topic});
    setMessage(result.message);
};
  
export const handleSubmit = (e, editId, setEditId, currentMarkdown, bookTitle, topic, setMessage) => {
    e.preventDefault();
    const data = { editId, currentMarkdown,  bookTitle, topic }
    if (editId) {
        updateMarkdown({ data, setMessage});
    } else {
        createMarkdown({ setEditId, data, setMessage });
    }
};
  
export const fetchInitMarkdown = async (setCurrentMarkdown, articleId) => {
    const result = fetchInitMarkdownAPI(articleId)
    setCurrentMarkdown(result);
};
  
export const fetchMarkdowns = async (setMarkdowns) => {
    const response = await fetch('/api/markdowns/');
    const result = await response.json();
    console.log(result)
    setMarkdowns(result);
};
  
export const deleteMarkdown = async (id, setMessage) => {
const response = await fetch('/api/markdown', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, bookTitle, topic }),
});
const result = await response.json();
setMessage(result.message);
// fetchMarkdowns();
};

export const handleEdit = (markdown, setCurrentMarkdown, setEditId) => {
    localStorage.setItem('markdown', markdown);
    setCurrentMarkdown(markdown);
    console.log(markdown)
    setEditId(markdown.id);
};