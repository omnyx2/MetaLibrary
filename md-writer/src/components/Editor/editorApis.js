export const createMarkdownAPI = async ({currentMarkdown,  bookTitle, topic}) => {
    const response = await fetch('/api/markdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: currentMarkdown, bookTitle, topic }),
      });
      return await response.json();
}

export const updateMarkdownAPI = async ({ editId, currentMarkdown,  bookTitle, topic}) => {
    const response = await fetch('/api/markdown', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, markdown: currentMarkdown, bookTitle, topic }),
    });
    return await response.json();
};

export const fetchInitMarkdownAPI = async ( articleId ) => {
    const response = await fetch('/api/markdown?id='+articleId);
    return await response.json();
};