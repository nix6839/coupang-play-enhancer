import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import manifest from './manifest.json' with { type: 'json' };

export default defineConfig({
	plugins: [solid(), crx({ manifest })],
});
