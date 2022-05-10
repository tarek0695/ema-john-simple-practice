import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetails/ProductDetail';
import Shipment from './components/Shipment.js/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      <h3>Name: {loggedInUser.displayName}</h3>
      <Router>
      <Header></Header>
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path="review" element={<Review />} />
          <Route path='/inventory' element={<PrivateRoute> <Inventory /> </PrivateRoute>} />
          {/* <Route path='/shipment' element={<Shipment />} /> */}
          <Route path='/shipment' element={<PrivateRoute><Shipment /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Shop />} />
          <Route path='/product/:productKey' element={<ProductDetail />} />


          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <h2>Page not found!</h2>
                <h5>Error 404!</h5>
              </main>
            }
          />

        </Routes>
      </Router>
    </UserContext.Provider >

  );
}

export default App;
