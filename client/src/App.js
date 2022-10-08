import "./App.css";
import CreateProject from "./components/Project";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const baseURL = "http://localhost/5000";
  return (
    <div className="App">
      <SignUp baseURL={baseURL} />
      <CreateProject />
    </div>
  );
}

export default App;
