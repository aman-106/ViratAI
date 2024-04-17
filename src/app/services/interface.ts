"use client";

import { title } from "process";

export interface IMsg {
  role: ROLE;
  message: string;
  id:string;
  rawMsg?:string;
}


export enum ROLE {
  USER='user',
  BOT='bot'
}


export interface IMsgInfo {
  id:string;
  title:string;
  timestamp:string;
}


export interface FavoritesContextType {
  favorites: string[];
  saveFavorite: (input: string) => void;
  getFavorites: () => string[];
}