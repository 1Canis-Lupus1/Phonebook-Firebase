import "./App.css";
import Contact from "./components/displayList";
import { Header } from "./components/header";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-md-12">
          <Header />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
