import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Dine Mate - Home
        </p>
        <a
          className="App-link"
          href="/client/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Admin Panel
        </a>
        <a
          className="App-link"
          href="/customer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Customer App
        </a>
      </header>
    </div>
  );
}

export default App;
