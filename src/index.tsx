import { render } from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from './components/code-cell';

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

render(<App />, document.querySelector('#root'));
