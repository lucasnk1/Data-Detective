// userId -> progress
// progress: { xp, solved: { [caseId]: { startedAt, finishedAt, queryCount, hintsUsed } } }
const progress = new Map();

function getProgress(userId) {
  const key = String(userId);
  if (!progress.has(key)) {
    progress.set(key, { xp: 0, solved: {} });
  }
  return progress.get(key);
}

module.exports = { getProgress };

