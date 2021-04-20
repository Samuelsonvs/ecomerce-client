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
import ProductList from './components/private/ProductList';
import AdminRoute from './components/private/AdminRoute';
import Dashboard from './components/private/Dashboard';
import OrderList from './components/private/OrderList';
import CustomerList from './components/private/CustomerList';
import ProductEdit from './components/private/ProductEdit';


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
          <AdminRoute exact path="/dashboard" component={Dashboard}></AdminRoute>
          <AdminRoute path="/dashboard/productlist" component={ProductList}></AdminRoute>
          <AdminRoute path="/dashboard/orderlist" component={OrderList}></AdminRoute>
          <AdminRoute path="/dashboard/customerlist" component={CustomerList}></AdminRoute>
          <AdminRoute path="/product/edit/:id" component={ProductEdit}></AdminRoute>
        </main>
        <footer className="bg-indigo-50">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}



<button></button>