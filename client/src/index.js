import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cartContext";
import { SearchProvider } from "./context/searchContext";
import { CategorySearchProvider } from "./context/categoryFilterContext";
import { PriceProvider } from "./context/priceContext";
import { UpdatProvider } from "./context/updatePetsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <CategorySearchProvider>
          <PriceProvider>
            <UpdatProvider>
              <BrowserRouter>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </BrowserRouter>
            </UpdatProvider>
          </PriceProvider>
        </CategorySearchProvider>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
