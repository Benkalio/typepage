import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
import { render } from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';


const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');
  
  // this state is the output of the transpiled code from ESbuild 
  // displayed in <pre> tag
  // const [code, setCode] = useState('');

  
  // esbuild wasm setup
  // get esbuild from public file
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }
  useEffect(() => {
    startService();
  }, []);

  // show code anytime a user clicks button 
  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    // Resetting content in the iframe after each code transpile
    iframe.current.srcdoc = html;

    // bundling process: this is to transpile input 
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE.ENV': '"production"',
        global: 'window',
      },
    });
    
    // setCode(result.outputFiles[0].text);

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  // iframe html
  // html structure written for events 
  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              throw err;
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <iframe
        ref={iframe}
        title="title"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

render(<App />, document.querySelector('#root'))