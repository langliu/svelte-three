import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [mdsvex({ extensions: ['.md', '.svelte.md', '.svx'] }), vitePreprocess()],
  kit: {
    adapter: adapter()
  },
  extensions: ['.svelte', '.md', '.svelte.md']
};

export default config;
