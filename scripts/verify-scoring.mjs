import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const source = readFileSync('src/quiz.js', 'utf8');
const { questions, profiles, inspectAnswers } = vm.runInNewContext(
  source + '\n;({questions, profiles, inspectAnswers})',
);
const axisMaps = Array.from({length: 4}, (_, axis) => {
  const items = questions.map((q, index) => ({ ...q, index })).filter(q => q.axis === axis);
  assert.equal(items.length, 3);
  const sums = new Map();
  for (let a = 0; a < 4; a += 1) {
    for (let b = 0; b < 4; b += 1) {
      for (let c = 0; c < 4; c += 1) {
        const pairings = [a, b, c].map((answer, index) => [items[index].index, answer]);
        const score = items[0].answers[a][0] + items[1].answers[b][0] + items[2].answers[c][0];
        sums.set(score, pairings);
      }
    }
  }
  assert.equal(sums.size, 13);
  return sums;
});
let combinations = 0;
const matching = Object.fromEntries(profiles.map(p => [p.id, 0]));
const samples = Object.fromEntries(profiles.map(p => [p.id, { score: Infinity }]));
for (const a of axisMaps[0].values()) {
  for (const b of axisMaps[1].values()) {
    for (const c of axisMaps[2].values()) {
      for (const d of axisMaps[3].values()) {
        const answers = [];
        for (const [question, answer] of [...a, ...b, ...c, ...d]) answers[question] = answer;
        const { profile, evidence, scores } = inspectAnswers(answers);
        assert.equal(evidence.length, 2);
        for (const e of evidence) assert.equal(e.text, questions[e.index].answers[answers[e.index]][1]);
        matching[profile.id] += 1;
        const score = scores.reduce((total, value, index) => total + (value - profile.target[index]) ** 2, 0);
        if (score < samples[profile.id].score) samples[profile.id] = { score, answers, tier: profile.tier, role: profile.role };
        combinations += 1;
      }
    }
  }
}
assert.throws(() => inspectAnswers([]));
assert.throws(() => inspectAnswers(Array(12).fill(5)));
assert.deepEqual(Object.values(samples).map(s => s.score), Array(8).fill(0));
console.log(JSON.stringify({ combinations, matching, samples }, null, 2));
