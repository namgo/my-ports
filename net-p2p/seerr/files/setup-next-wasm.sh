#!/bin/sh

set -e
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
pwd
NEXT_DIR=$(ls -d node_modules/.pnpm/next@*/node_modules/next)
NEXT_VER=$(jq -r .version "${NEXT_DIR}/package.json")
NEXT_MINOR=$(echo "${NEXT_VER}" | sed 's/\.[0-9]*$//')
echo "Next.js ${NEXT_VER}: installing WASM SWC ~${NEXT_MINOR}.0"
pnpm add --ignore-scripts "@next/swc-wasm-nodejs@~${NEXT_MINOR}.0"
WASM_SRC=$(ls -d node_modules/.pnpm/@next+swc-wasm-nodejs@*/node_modules/@next/swc-wasm-nodejs)
mkdir -p "${NEXT_DIR}/wasm/@next/swc-wasm-nodejs"
cp -r "${WASM_SRC}"/* "${NEXT_DIR}/wasm/@next/swc-wasm-nodejs/"
node ${SCRIPT_DIR}/fix-swc.js "${NEXT_DIR}"
