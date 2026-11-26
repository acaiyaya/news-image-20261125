import { join, resolve } from 'node:path';
import { copyFile, mkdir } from 'node:fs/promises';

const destination = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
await mkdir(destination, { recursive: true });

const artwork = new URL('./entry.png', import.meta.url);
await copyFile(artwork, join(destination, 'entry.png'));
