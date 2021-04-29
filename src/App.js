import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from "./components/layouts/footer";
import NavbarMobileToggler from './components/layouts/navbarMobileToggler';
import Navbar from './components/layouts/navbar';
import Header from './components/layouts/header';
import AdminRoute from './components/private/AdminRoute';
import LoadingBox from './components/public/loadingBox';
import UserRoute from './components/private/UserRoute';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsScreen = React.lazy(() => import("./pages/ProductsScreen"));
const ProductDetailScreen = React.lazy(() => import('./pages/ProductDetailScreen'));
const SigninScreen = React.lazy(() => import('./pages/SigninScreen'));
const RegisterScreen = React.lazy(() => import('./pages/RegisterScreen'));
const ContactScreen = React.lazy(() => import('./pages/ContactScreen'));
const ProductList = React.lazy(() => import('./components/private/ProductList'));
const Dashboard = React.lazy(() => import('./components/private/Dashboard'));
const OrderList = React.lazy(() => import('./components/private/OrderList'));
const CustomerList = React.lazy(() => import('./components/private/CustomerList'));
const ProductEdit = React.lazy(() => import('./components/private/ProductEdit'));
const UpdateProduct = React.lazy(() => import('./components/private/UpdateProduct'));
const CreateProduct = React.lazy(() => import('./components/private/CreateProduct'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingBox />}>
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
          <Switch>
            <Route exact path="/" component={props => <HomePage {...props} />}></Route>
            <Route path="/adverts" component={props => <ProductsScreen {...props} />}></Route>
            <Route path="/advert/:id" component={props => <ProductDetailScreen {...props} />}></Route>
            <Route path="/signin" component={props => <SigninScreen {...props} />}></Route>
            <Route path="/register" component={props => <RegisterScreen {...props} />}></Route>
            <Route path="/contact" component={props => <ContactScreen {...props} />}></Route>
            <UserRoute path="/create" component={props => <CreateProduct {...props} />}></UserRoute>
            <AdminRoute exact path="/dashboard" component={props => <Dashboard {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/productlist" component={props => <ProductList {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/orderlist" component={props => <OrderList {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/customerlist" component={props => <CustomerList {...props} />}></AdminRoute>
            <AdminRoute path="/dashboard/update/:id" component={props => <UpdateProduct {...props} />}></AdminRoute>
            <AdminRoute path="/product/edit/:id" component={props => <ProductEdit {...props} />}></AdminRoute>
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
