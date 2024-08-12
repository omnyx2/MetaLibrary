// lib/historyManager.js
const { diffLines } = require('diff');
const crypto = require('crypto');
const { readHistoryFile, writeHistoryFile } = require('./fileSystem');

async function getHistory() {
  const historyData = await readHistoryFile();
  return JSON.parse(historyData);
}

async function addCommit( oldContent, newContent, commitMessage ) {
  const changes = diffLines(oldContent, newContent);
  const history = await getHistory();

  const newCommit = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    changes: changes.filter(change => change.added || change.removed),
    commitMessage
  };

  history.push(newCommit);
  await writeHistoryFile(JSON.stringify(history, null, 2));

  return { identifier: newCommit.id, status:200};
}


module.exports = {
  getHistory,
  addCommit,
};
