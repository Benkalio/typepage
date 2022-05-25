import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
  /* Called once the Code Editor is first displayed 
    on the screen. First args is the initial value 
    and second args is the reference to the monaco editor displayed 
  */
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  return <MonacoEditor
    editorDidMount={onEditorDidMount}
    value={initialValue} //initial value of the interface
    theme='dark'
    language='javascript'
    height='400px'
    options={{
      wordWrap: 'on',
      minimap: { enabled: false },
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }}
  />;
};

export default CodeEditor;
