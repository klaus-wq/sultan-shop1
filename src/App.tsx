import './App.css'

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Admin from './components/Admin/Admin'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import { Cart } from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Products } from './components/Products/Products'
import ProductsCard from './components/ProductsCard/ProductsCard'
import Manager from './manager/Manager'

function App() {
  const [isLoaded, updateLoaded] = useState(false);
  const [manager] = useState(() => {
    let mgr = new Manager();
    mgr.productsManager.onLoading = () => {
      updateLoaded(true)
    };
    return mgr;
  });

  useEffect(() => {
    manager.productsManager.loadProducts();
  }, []);

  return (
    <div className="wrapper">
      {isLoaded ?
        <BrowserRouter>
          <Header cart={manager.cartManager} />
          <Breadcrumbs manager={manager} />
          <Routes>
            <Route
              path="/"
              element={
                <Products manager={manager} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart manager={manager} />
              }
            />
            <Route
              path="/product"
              element={
                <ProductsCard manager={manager} />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin manager={manager} />
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
        : "Загрузка..."}
    </div>
  );
}

export default App;
