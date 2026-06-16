import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import AdminRoute from "./components/ui/AdminRoute.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderTracking from "./pages/OrderTracking.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Contacts from "./pages/admin/Contacts.jsx";

function App() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <div className="app-shell">
      {!isAdminPage && <Navbar />}
      <Toaster position="top-right" />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="categories" element={<Categories />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;