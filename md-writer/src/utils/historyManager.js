// lib/historyManager.js

// only works with markdownx
const { diffWords } = require('diff');
const crypto = require('crypto');
import { readHistoryFile, updateHistoryFile, createHistoryFile } from '@/utils/fsUtils/history';

async function getHistory(id) {
  const historyData = await readHistoryFile(id);
  return JSON.parse(historyData.history);
}

async function newCommit(id,newContent,message){
  const changes = diffWords("[]", newContent);

  const newCommit = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    changes: changes.filter(change => change.added || change.removed),
    message
  };

  const result = await createHistoryFile(id, JSON.stringify([newCommit]));
  
  return result;
}

async function addCommit({identifier, oldContent, newContent, commitMessage}) {
  const changes = diffWords(oldContent, newContent);
  const result = await getHistory(identifier);
  const newCommit = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    changes: changes.map(part => ({
        value: part.value,
        added: part.added,
        removed: part.removed
      })),
      commitMessage
  };

  result.push(newCommit);
  return await updateHistoryFile(identifier,JSON.stringify(result));
}

async function addCommitPipe(props){
  try {
    const identifier = props.identifier
    const oldContent = props.oldMarkdown;
    const newContent = props.markdown;
    const commitMessage = props.commitMessage;
    if(props.result.status !== 200) throw Error("Error Found before addingCommit")
      const result =  await addCommit({ identifier, oldContent, newContent, commitMessage });
      return {
          ...props,
          result: {
              message: "Successfully add the commited",
              status: 200
          }
      }
  } catch(err) {
    console.error(err,props)
    return {
        ...props,
        result: {
            message: "Fail to Found updateMarkdownPipe",
            status: 403
        }
    }
  }

}

module.exports = {
  getHistory,
  addCommit,
  addCommitPipe,
  newCommit,
};