import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import '../build.mjs';

const output = new URL('../site/index.html', import.meta.url);
copyFileSync(new URL('../share.jpg', import.meta.url), new URL('../site/share.jpg', import.meta.url));

const baseUrl = process.env.PAGES_BASE_URL;
if (baseUrl) {
  const canonical = new URL(baseUrl);
  if (canonical.protocol !== 'https:' || canonical.username || canonical.password || canonical.search || canonical.hash) {
    throw new Error('PAGES_BASE_URL must be an HTTPS site URL.');
  }
  canonical.pathname = canonical.pathname.replace(/\/*$/, '/');
  const attribute = url => url.href.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const share = attribute(new URL('share.jpg', canonical));
  const original = readFileSync(output, 'utf8');
  const published = original.replace(
    '  <meta property="og:image" content="share.jpg">',
    () => `  <link rel="canonical" href="${attribute(canonical)}">\n  <meta property="og:image" content="${share}">`,
  );
  if (published === original) throw new Error('The homepage is missing its share metadata.');
  writeFileSync(output, published);
}
