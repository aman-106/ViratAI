"use client";

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
