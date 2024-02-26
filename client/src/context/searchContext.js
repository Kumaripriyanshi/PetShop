import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [keywords, setKeyword] = useState("");



  return (
    <SearchContext.Provider value={[keywords, setKeyword ]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);
// const useFilterSearch = () => useContext(SearchContext);


export { useSearch, SearchProvider };

