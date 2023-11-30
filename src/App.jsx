import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default App;
