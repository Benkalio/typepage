import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage, { INDEXEDDB } from 'localforage';

// USING OBJECT TO INTERACT WITH AN INSTANCE OF AN INDEXEDDB DATABASE IN THE BROWSER 
// using filecache to get and set and item inside a database
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        };

        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately  
        if (cachedResult){
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache 
        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
}