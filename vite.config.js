export default {
  base: '/',
  server: { host: '0.0.0.0', port: 5173 },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: { input: 'index.html' }
  }
};
