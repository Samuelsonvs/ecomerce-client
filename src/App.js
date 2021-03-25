import React from 'react';
import HomePage from "./screens/HomePage";
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from "./components/layouts/footer";
import NavbarMobileToggler from './components/layouts/navbarMobileToggler';
import Navbar from './components/layouts/navbar';
import Login from './components/layouts/login';
import Header from './components/layouts/header';
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailScreen from './screens/ProductDetailScreen';


export default function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header bg-indigo-700">
          {/* head and icon  */}
          <Header />
          {/* navigation */}
          <Navbar />
          {/* mobile navigation */}
          <NavbarMobileToggler />
          {/* login and signin */}
          <Login />
        </header>
        <main className="bg-indigo-50">
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/ilanlar" component={ProductsScreen}></Route>
          <Route path="/ilan/:id" component={ProductDetailScreen}></Route>
        </main>
        <footer className="bg-indigo-50">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}



<button></button>