import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/account/Login";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Global/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";
import { useEffect } from "react";
import { WishListProvider } from "./context/WIshListProvider";
import Account from "./components/account/Account";
import Register from "./components/account/Register";
import Products from "./pages/Products";
import ScrollToTop from "./components/Global/ScrollToTop";

function App() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <WishListProvider>
        <Header currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/account" /> : <Login />}
          />
          <Route
            path="/register"
            element={currentUser ? <Navigate to="/account" /> : <Register />}
          />
          <Route
            path="/account"
            element={currentUser ? <Account /> : <Navigate to="/login" />}
          />
          <Route path="/products" element={<Products products={products} />} />
        </Routes>
      </WishListProvider>
    </>
  );
}

export default App;
