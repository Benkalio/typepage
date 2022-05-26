import { useState } from "react";
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';

const CodeCell = () => {
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

export default CodeCell;
