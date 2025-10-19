import { Toaster } from "react-hot-toast";
import "./App.css";
import "./index.css";
import AppRouter from "./routes/Routes";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
