import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
