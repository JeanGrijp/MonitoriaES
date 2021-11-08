import { CountContextProvider } from "./context/CountContext";
import Count from "./pages/Count/Count";


function App() {
  return (
    <div className="App">
      <CountContextProvider>
        <Count/>
      </CountContextProvider>

    </div>
  );
}

export default App;
