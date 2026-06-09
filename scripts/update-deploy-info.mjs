import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const file = join(process.cwd(), 'public', 'deploy-info.json');
mkdirSync(dirname(file), { recursive: true });
let current = { deployNumber: 124 };
if (existsSync(file)) {
  try { current = JSON.parse(readFileSync(file, 'utf8')); } catch {}
}
const next = Number(current.deployNumber || 0) + 1;
const info = {
  version: 'v1.2.7',
  deployNumber: next,
  updatedAt: new Date().toISOString(),
  commit: process.env.VERCEL_GIT_COMMIT_SHA || '',
  branch: process.env.VERCEL_GIT_COMMIT_REF || '',
  source: process.env.VERCEL ? 'vercel-build' : 'local-build'
};
writeFileSync(file, JSON.stringify(info, null, 2) + '\n');
console.log(`Deploy bilgisi güncellendi: v1.2.7 #${next}`);
