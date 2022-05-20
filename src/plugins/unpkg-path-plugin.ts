import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage, { INDEXEDDB } from 'localforage';

// USING OBJECT TO INTERACT WITH AN INSTANCE OF AN INDEXEDDB DATABASE IN THE BROWSER 
// using filecache to get and set and item inside a database
const fileCache = localForage.createInstance({
  name: 'filecache'
});

// (async () => {
//   await fileCache.setItem('color', 'red');

//   const color = await fileCache.getItem('color');

//   console.log(color);
  
// })()

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.paths === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }
      
        // Relative file check 
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + './'
            ).href
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react-select';
              import ReactDOM from 'react-dom';
              console.log(React, useState, ReactDOM);
            `,
          };
        };

        // Check to see if we have already fetched this file
        // and if it is in the cache

        // if it is, return it immediately

        const { data, request } = await axios.get(args.path);
        // store response in cache 

        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};
