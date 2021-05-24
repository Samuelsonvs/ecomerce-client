import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from "./components/layouts/footer";
import NavbarMobileToggler from './components/layouts/navbarMobileToggler';
import Navbar from './components/layouts/navbar';
import Header from './components/layouts/header';
import AdminRoute from './components/private/AdminRoute';
import LoadingBox from './components/public/loadingBox';
import UserRoute from './components/private/UserRoute';
import HomePage from './pages/HomePage'; 
import ProductsScreen from './pages/ProductsScreen';
import ProductDetailScreen from './pages/ProductDetailScreen';
import SigninScreen from './pages/SigninScreen';
import RegisterScreen from './pages/RegisterScreen';
import ContactScreen from './pages/ContactScreen';
import NotFoundScreen from './pages/NotFoundScreen';
import AccountVerifiedScreen from './pages/AccountVerifiedScreen';


// const HomePage = lazy(() => import('./pages/HomePage'));
// const ProductsScreen = lazy(() => import('./pages/ProductsScreen'));
// const ProductDetailScreen = lazy(() => import('./pages/ProductDetailScreen'));
// const SigninScreen = lazy(() => import('./pages/SigninScreen'));
// const RegisterScreen = lazy(() => import('./pages/RegisterScreen'));
// const ContactScreen = lazy(() => import('./pages/ContactScreen'));
// const NotFoundScreen = lazy(() => import('./pages/NotFoundScreen'));
const ProductList = lazy(() => import('./components/private/ProductList'));
const Dashboard = lazy(() => import('./components/private/Dashboard'));
const CustomerList = lazy(() => import('./components/private/CustomerList'));
const ProductEdit = lazy(() => import('./components/private/ProductEdit'));
const UpdateProduct = lazy(() => import('./components/private/UpdateProduct'));
const CreateProduct = lazy(() => import('./components/private/CreateProduct'));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingBox />}>
      <div className="grid-container">
        <header className="header bg-indigo-600">
          {/* head and icon  */}
          <Header />
          {/* navigation */}
          <Navbar />
          {/* mobile navigation */}
          <NavbarMobileToggler />
        </header>
        <main className="bg-indigo-50">
          <Switch>
            <Route exact path="/" component={props => <HomePage {...props} />}></Route>
            <Route path="/adverts" component={props => <ProductsScreen {...props} />}></Route>
            <Route path="/advert/:id" component={props => <ProductDetailScreen {...props} />}></Route>
            <Route path="/signin" component={props => <SigninScreen {...props} />}></Route>
            <Route path="/register" component={props => <RegisterScreen {...props} />}></Route>
            <Route path="/contact" component={props => <ContactScreen {...props} />}></Route>
            <Route path="/activate/user/:id" component={props => <AccountVerifiedScreen {...props} />}></Route>
            <Route exact path="/dashboard" component={props => <Dashboard {...props} />}></Route>
            <UserRoute path="/create" component={props => <CreateProduct {...props} />}></UserRoute>
            <AdminRoute path="/dashboard/productlist" component={props => <ProductList {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/customerlist" component={props => <CustomerList {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/update/:id" component={props => <UpdateProduct {...props} />}></AdminRoute>
            <AdminRoute path="/product/edit/:id" component={props => <ProductEdit {...props} />}></AdminRoute> 
            <Route component={props => <NotFoundScreen {...props} />}></Route>
          </Switch>
        </main>
        <footer className="bg-indigo-50">
          <Footer />
        </footer>
      </div>
      </Suspense>
    </BrowserRouter>
  )
}