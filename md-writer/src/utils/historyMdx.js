// lib/historyManager.js
const { diffLines } = require('diff');
const crypto = require('crypto');
const { readHistoryFile, writeHistoryFile } = require('./fileSystem');

async function getHistory() {
  const historyData = await readHistoryFile();
  return JSON.parse(historyData);
}

async function addCommit(oldContent, newContent, message) {
  const changes = diffLines(oldContent, newContent);
  const history = await getHistory();

  const newCommit = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    changes: changes.filter(change => change.added || change.removed),
    message
  };

  history.push(newCommit);
  await writeHistoryFile(JSON.stringify(history, null, 2));

  return newCommit.id;
}

async function addCommitPipe(props){
  try {
    if(props.result.status !== 200) throw Error("Error Found before addingCommit")
      const result =  await addCommit(lePath(), props.markdown);
      console.log('A passed')
      return {
          ...props,
          result: {
              message: "Successfully updateMarkdownPipe",
              status: result.status
          }
      }
  } catch {
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
  addCommit
};
