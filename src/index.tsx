import React from 'react';
import { render } from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <Provider store={store}>
      <TextEditor />
      {/* <CodeCell /> */}
    </Provider>
  );
};

render(<App />, document.querySelector('#root'));
