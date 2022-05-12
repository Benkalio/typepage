import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";
import { render } from 'react-dom';



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
  const onClick = () => {
    if (!ref.current) {
      return console.log(ref.current);
    }
  }

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