import { useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  console.log(bundle);

  // bundling logic: this is to transpile input
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

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
        {/* <Preview code={code} bundlingStatus={err} /> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
