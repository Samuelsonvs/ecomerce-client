import React from 'react';
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from "./components/layouts/footer";
import NavbarMobileToggler from './components/layouts/navbarMobileToggler';
import Navbar from './components/layouts/navbar';
import Header from './components/layouts/header';
import ProductsScreen from "./pages/ProductsScreen";
import ProductDetailScreen from './pages/ProductDetailScreen';
import SigninScreen from './pages/SigninScreen';
import RegisterScreen from './pages/RegisterScreen';
import ContactScreen from './pages/ContactScreen';


export default function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header bg-gray-700">
          {/* head and icon  */}
          <Header />
          {/* navigation */}
          <Navbar />
          {/* mobile navigation */}
          <NavbarMobileToggler />
        </header>
        <main className="bg-indigo-50">
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/ilanlar" component={ProductsScreen}></Route>
          <Route path="/ilan/:id" component={ProductDetailScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/contact" component={ContactScreen}></Route>
        </main>
        <footer className="bg-indigo-50">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}



<button></button>