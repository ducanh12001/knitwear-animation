import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import CustomScrollbar from "./components/others/CustomScrollbar";
import { Header } from "./components/organisms/header/Header";
import "./App.css";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative h-auto w-full">
      <Header />
      <HomePage />
      <CustomScrollbar />
    </div>
  );
}

export default App;
