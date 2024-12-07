// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer"; // Import du footer

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/addproduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route path="/admindashbord" element={<AdminDashboard />} />
          </Routes>
          <Footer /> {/* Ajout du footer */}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
