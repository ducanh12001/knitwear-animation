import ScrollCircle from "./components/ScrollCircle";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductList from "./pages/HomePage/ProductList";
import Footer from "./components/Footer";
import { useEffect } from "react";
import CustomScrollbar from "./components/CustomScrollbar";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative h-auto w-full">
      <Header />
      <HomePage />
      <ProductList />
      <Footer />
      <ScrollCircle />
      <CustomScrollbar />
    </div>
  );
}

export default App;
