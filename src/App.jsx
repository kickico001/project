import Navbar from "./component/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stake from "./pages/Stake";

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/stake" element={<Stake />} />
        </Routes>
      </Router>
  );
};

export default App;
