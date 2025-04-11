import ScrollCircle from "./components/ScrollCircle";
import MainContent from "./components/MainContent";
import "./App.css";
import { Header } from "./components/Header";
import ProductList from "./components/MainContent/ProductList";

function App() {
  return (
    <div className="relative w-full h-auto">
      <Header />
      <MainContent />
      <ProductList />
      <ScrollCircle />
    </div>
  );
}

export default App;
