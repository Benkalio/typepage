import { useState } from "react";
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    // bundling process: this is to transpile input 
    const output = await bundle(input)
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const x = 26;"
            onChange={(value) => setInput(value)}  
          />
        </Resizable>
        <Preview code={code} />
        </div>
    </Resizable>
  );
};

export default CodeCell;
