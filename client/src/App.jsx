
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Product from './pages/Product/Product';
import Settings from './pages/Settings/Settings';
import Shop from './pages/Shop/Shop';
import Profile from './pages/profile/profile';
import PersistLogin from './components/Persistlogin';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import './App.css';

function App() {

  localStorage.getItem("cart") ? {} : localStorage.setItem("cart", JSON.stringify({ id: "nothing", quantity: 1 }));
  localStorage.getItem("wishList") ? {} : localStorage.setItem("wishList", JSON.stringify({ id: "nothing" }));


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop/:substr" element={<Shop />} />
        <Route path="/shop/" element={<Shop />} />
      </Routes>
    </>
  );
}

export default App;
