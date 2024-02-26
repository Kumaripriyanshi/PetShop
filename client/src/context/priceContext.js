import { useState, useEffect, useContext, createContext } from "react";

const PriceContext = createContext();

const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState(0);

  //   axios.defaults.headers.common["auth"] = auth?.token;

//   useEffect(() => {
//     const data = localStorage.getItem("user-cart");

//     if (data) {
//       setCart(JSON.parse(data));
//     }

//     //eslint-disable-next-line
//   }, []);

  return (
    <PriceContext.Provider value={[price, setPrice]}>
      {children}
    </PriceContext.Provider>
  );
};

const usePrice = () => useContext(PriceContext);

export { usePrice, PriceProvider };
