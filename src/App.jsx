import React from "react";
import { Toaster } from "./components/ui/toaster"; // ✅ import the Toaster
import AppRouter from "./routes/Routes";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppRouter />
      <Toaster />
    </>
  );
};

export default App;

