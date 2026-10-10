import { build } from 'esbuild';

await build({
  entryPoints: ['src/bridge.js'],
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2020',
  outfile: 'www/bridge.js',
});
console.log('bridge.js built');
