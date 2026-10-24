import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig, normalizePath, type Plugin } from 'vite';

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';

function markdownArticleReload(): Plugin {
  return {
    name: 'markdown-article-reload',
    apply: 'serve',
    configureServer(server) {
      const directories = ['game-systems', 'devlog'].map(
        (directory) => normalizePath(resolve(server.config.root, 'content', directory)) + '/',
      );

      server.watcher.add(directories);

      const reloadArticle = (file: string) => {
        const filePath = normalizePath(resolve(file));
        if (filePath.endsWith('.md') && directories.some((directory) => filePath.startsWith(directory))) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      };

      server.watcher.on('add', reloadArticle);
      server.watcher.on('change', reloadArticle);
      server.watcher.on('unlink', reloadArticle);
      server.httpServer?.once('close', () => {
        server.watcher.off('add', reloadArticle);
        server.watcher.off('change', reloadArticle);
        server.watcher.off('unlink', reloadArticle);
      });
    },
  };
}

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: isCodexSeatbeltSandbox
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
  plugins: [vinext(), markdownArticleReload()],
});
