import React from 'react';
import { render } from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { Provider } from 'react-redux';
import { store } from './state';

// import TextEditor from './components/text-editor';
import CellList from './components/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

render(<App />, document.querySelector('#root'));
