# typescript-dev-env
build a develop environment for typescript with webpack

#basic
使い方
cd path/to/tsconfig.json
npm run build

#ThreeJS
npm i -D webpack webpack-cli typescript ts-loader
npm i -S three-js @types/three
npm i -D @types/node

使い方
cd threejs
npm run build --watch
or
npm run build -w
or
npm run watch