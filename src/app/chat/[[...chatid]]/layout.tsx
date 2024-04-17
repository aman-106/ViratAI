"use client";

import { SavedInputsList } from "../../components/SavedInputsList";
import SideNav from "../../components/side-nav";
import { FavoritesProvider } from "../../services/ProivderLocalStorageFavorites";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
        <SavedInputsList />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
    </FavoritesProvider>
  );
}