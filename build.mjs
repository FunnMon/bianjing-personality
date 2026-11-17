import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const read = file => readFileSync(new URL(file, import.meta.url), 'utf8');
const base64 = file => readFileSync(new URL(file, import.meta.url)).toString('base64');
const dataUri = (file, mime) => `data:${mime};base64,${base64(file)}`;
const font = dataUri('./src/cover.woff2', 'font/woff2');
const css = read('./src/motion.css') + '\n' + read('./src/site.css').replace('@@FONT@@', () => font);
const parts = {
  STYLE: css,
  FONT_LICENSE: read('./docs/OFL-NotoSerifSC.txt'),
  ART: dataUri('./src/qingming.webp', 'image/webp'),
  MOTION: dataUri('./src/motion.js', 'text/javascript'),
  QUIZ: read('./src/quiz.js'),
  APP: read('./src/app.js'),
};

const page = read('./src/index.template.html').replace(/@@([A-Z_]+)@@/g, (_, label) => {
  if (!(label in parts)) throw new Error(`Unknown template part: ${label}`);
  return parts[label];
});
mkdirSync(new URL('./site/', import.meta.url), { recursive: true });
writeFileSync(new URL('./site/index.html', import.meta.url), page);
