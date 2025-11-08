import React from "react";
import { Toaster } from "./components/ui/toaster"; // ✅ import the Toaster
import AppRouter from "./routes/Routes";


const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
};

export default App;

