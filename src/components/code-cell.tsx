import { useState, useEffect } from 'react';
import { useActions } from '../hooks/use-actions';

import bundle from '../bundler';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');

  const { updateCell } = useActions();

  // bundling logic: this is to transpile input
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% -10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
