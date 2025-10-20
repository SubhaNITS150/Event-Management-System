import { Toaster } from "react-hot-toast";
import "./App.css";
import "./index.css";
import AppRouter from "./routes/Routes";
import { useAuthStore } from "./services/authservices/authStore";
import { useEffect } from "react";

function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
