import { render } from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from "react";
import bundle from './bundler';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    // bundling process: this is to transpile input 
    const output = await bundle(input)
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const x = 26;"
        onChange={(value) => setInput(value)}  
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

render(<App />, document.querySelector('#root'))