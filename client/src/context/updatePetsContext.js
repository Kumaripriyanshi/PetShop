import { useState, useEffect, useContext, createContext } from "react";

const updateContext = createContext();

const UpdatProvider = ({ children }) => {
  const [updValue, setUpdValue] = useState({});

 

  return (
    <updateContext.Provider value={[updValue, setUpdValue]}>
      {children}
    </updateContext.Provider>
  );
};

const useUpdate = () => useContext(updateContext);

export { useUpdate, UpdatProvider };
