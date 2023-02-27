import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import Dashboard from "./components/Dashboard";
import CoinDetail from "./components/CoinDetail";
import PageNotFound from "./components/PageNotFound";
import GoToTop from "./GoToTop";
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coins/:id" element={<ChakraProvider><CoinDetail /></ChakraProvider>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ChakraProvider>
        <Footer />
        </ChakraProvider>
        <GoToTop/>
      </Router>
    </>
  );
}

export default App;
