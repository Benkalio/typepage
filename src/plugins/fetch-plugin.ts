import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage, { INDEXEDDB } from 'localforage';

// USING OBJECT TO INTERACT WITH AN INSTANCE OF AN INDEXEDDB DATABASE IN THE BROWSER 
// using filecache to get and set an item inside a database
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
        // if it is, return it immediately  
        // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if (cachedResult) {
        //   return cachedResult;
        // }

        const { data, request } = await axios.get(args.path);

        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx'        

        // Replacing the terminated quote in the css import
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        
        // Strategy to import css files and bundle it with esbuild 
        const contents = fileType === 'css'
          ? `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
          `
          : data;
        
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache 
        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  }
};