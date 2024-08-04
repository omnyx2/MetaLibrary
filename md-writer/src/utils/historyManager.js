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

async function addCommit(id, oldContent, newContent, message) {
  const changes = diffWords(oldContent, newContent);
  const result = await getHistory(id);
  console.log("resul;t",result, "wghu?")
  const newCommit = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    changes: changes.map(part => ({
        value: part.value,
        added: part.added,
        removed: part.removed
      })),
    message
  };

  result.push(newCommit);
  console.log(result);
  return await updateHistoryFile(id,JSON.stringify(result));
}

module.exports = {
  getHistory,
  addCommit,
  newCommit
};