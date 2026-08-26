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
import CartNotification from "./pages/Cart/CartNotification";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess/PaymentSuccess";

import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin/AdminLogin";

import BooksAdmin from "./admin/Books/BooksAdmin";
import AddBook from "./admin/Books/AddBook/AddBook";
import OrdersAdmin from "./admin/Orders/OrdersAdmin";
import MessagesAdmin from "./admin/Messages/MessagesAdmin";


function PublicLayout({ children }) {
  return (
    <div className="app">

      <Navbar />

      <main className="app__main">
        {children}
      </main>

      <Footer />

      <CartNotification />

    </div>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ============================================================
            PUBLIC WEBSITE
        ============================================================ */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/books"
          element={
            <PublicLayout>
              <Books />
            </PublicLayout>
          }
        />

        <Route
          path="/books/:bookId"
          element={
            <PublicLayout>
              <BookDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/books/:bookId/purchase"
          element={
            <PublicLayout>
              <Purchase />
            </PublicLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <Checkout />
            </PublicLayout>
          }
        />

        <Route
          path="/payment"
          element={
            <PublicLayout>
              <Payment />
            </PublicLayout>
          }
        />

        <Route
          path="/payment/success"
          element={
            <PublicLayout>
              <PaymentSuccess />
            </PublicLayout>
          }
        />

        <Route
          path="/payment-success/"
          element={
            <PublicLayout>
              <PaymentSuccess />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <PublicLayout>
              <Cart />
            </PublicLayout>
          }
        />


        {/* ============================================================
            ADMIN LOGIN
        ============================================================ */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* ============================================================
            ADMIN PANEL
        ============================================================ */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* ==========================================================
              DASHBOARD
          ========================================================== */}

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />


          {/* ==========================================================
              BOOKS
          ========================================================== */}

          <Route
            path="books"
            element={<BooksAdmin />}
          />


          {/* ==========================================================
              ADD BOOK
          ========================================================== */}

          <Route
            path="books/add"
            element={<AddBook />}
          />


          {/* ==========================================================
              ORDERS
          ========================================================== */}

          <Route
            path="orders"
            element={<OrdersAdmin />}
          />


          {/* ==========================================================
              MESSAGES
          ========================================================== */}

          <Route
            path="messages"
            element={<MessagesAdmin />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}


export default App;