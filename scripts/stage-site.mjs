import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const workspace = fileURLToPath(new URL('../', import.meta.url));
const staging = resolve(workspace, 'dist');
if (!staging.startsWith(resolve(workspace) + sep) || staging !== resolve('dist')) {
  throw new Error('Build staging must remain inside this project.');
}
await rm(staging, { recursive: true, force: true });

await mkdir('dist/client', { recursive: true });
await mkdir('dist/server', { recursive: true });
await cp('out', 'dist/client', { recursive: true });
await writeFile('dist/server/index.js', `export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };\n`);
await mkdir('dist/.openai', { recursive: true });
let hosting = {};
try { hosting = JSON.parse(await readFile('.openai/hosting.json', 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
await writeFile('dist/.openai/hosting.json', JSON.stringify(hosting, null, 2));
console.log('Static Next.js export staged for private Sites hosting.');
