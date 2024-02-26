import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //   axios.defaults.headers.common["auth"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("user-cart");

    if (data) {
      setCart(JSON.parse(data));
    }

    //eslint-disable-next-line
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
