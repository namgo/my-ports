const fs = require('fs');
const p = process.argv[2];
fs.writeFileSync(p + '/dist/lib/download-swc.js',
	  'module.exports.downloadNativeNextSwc=async function(){};module.exports.downloadWasmSwc=async function(){};');
let idx = fs.readFileSync(p + '/dist/build/swc/index.js', 'utf8');
idx = idx.replace(
	  /shouldLoadWasmFallbackFirst\s*=\s*[^;]+;/,
	  'shouldLoadWasmFallbackFirst = true;');
idx = idx.replace('process.exit(1)', '/* patched */');
fs.writeFileSync(p + '/dist/build/swc/index.js', idx);
console.log('SWC patched for FreeBSD WASM fallback');
