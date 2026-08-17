import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar";

import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";

import Books from "./pages/Books/Books";

import BookDetails from "./pages/Books/BookDetails/BookDetails";

import Purchase from "./pages/Books/Purchase/Purchase";

import About from "./pages/About/About";

import Contact from "./pages/Contact/Contact";

import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="app__main">
          <Routes>
            <Route path="/" 
              element={<Home />} 
            />

            <Route path="/books"
              element={<Books />} 
            />

            <Route
              path="/books/:bookId"
              element={<BookDetails />}
            />

            <Route
              path="/books/:bookId/purchase"
              element={<Purchase />}
            />

            <Route path="/about" element={<About />} />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route path="/cart" element={<Cart />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;