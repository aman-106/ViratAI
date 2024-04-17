import React, { createContext, useContext, useState } from "react";
import { FavoritesContextType } from "./interface";


const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("userFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const saveFavorite = (input) => {
    const updatedFavorites = [...favorites, input];
    localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const getFavorites = () => {
    const savedFavorites = localStorage.getItem("userFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, saveFavorite, getFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useLocalStorageFavorites = () => {
  return useContext(FavoritesContext);
};
