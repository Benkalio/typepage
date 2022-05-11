import ReactDOM from "react-dom";

const App = () => {
  return <div>
    <textarea></textarea>
    <div>
      <button>Submit</button>
    </div>
    <pre>New ook</pre>
  </div>
}

ReactDOM.render(<App />, document.querySelector('root'))