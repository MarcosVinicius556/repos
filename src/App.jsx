import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import Global from "./styles/global";

function App() {

  return (
    <>
      <Global />
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </>
  )
}

export default App
