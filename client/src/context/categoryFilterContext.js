import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const CategorySearchContext = createContext();

const CategorySearchProvider = ({ children }) => {
  const [categoryKeywords, setCategoryKeywords] = useState("");



  return (
    <CategorySearchContext.Provider value={[categoryKeywords, setCategoryKeywords]}>
      {children}
    </CategorySearchContext.Provider>
  );
};

const useCategorySearch = () => useContext(CategorySearchContext);
// const useFilterSearch = () => useContext(SearchContext);


export { useCategorySearch, CategorySearchProvider };

