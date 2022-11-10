import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>411 Project 1 Stage 4 CRUD Implementation</h1>

      <div className = "form">
        <label>Id: </label>
        <input type = "text" name = "UserId"></input>
        <label>Name: </label>
        <input type = "text" name = "UserName"></input>
        <label>Email: </label>
        <input type = "text" name = "UserEmail"></input>
        <label>Password: </label>
        <input type = "text" name = "UserPassword"></input>
        <button>Submit</button>

      </div>
    </div>
  );
}

export default App;
