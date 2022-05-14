import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import { render } from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';



const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  
  // this state is the output of the transpiled code from ESbuild 
  // displayed in the pre>
  const [code, setCode] = useState('');
  
  // esbuild wasm setup
  // get esbuild from public file
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
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

    //this is to transpile input 
    const result = await ref.current.build({
      input: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()]
      
      // //this tell esbuild the code to transpile
      // //in this case jsx
      // loader: 'jsx',
      // target: 'es2015'
    });
    
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

render(<App />, document.querySelector('#root'))