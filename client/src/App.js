import './App.css';
import {Home} from "./views";

const serverUrl = (process.env.NODE_ENV === "production" ? "" : "http://localhost:8000");

function App() {
  return (
    <div className="App">
      <Home
        serverUrl = {serverUrl}
      />
    </div>
  );
}

export default App;
