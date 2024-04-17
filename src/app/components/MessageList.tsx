"use client";
import React from "react";
import { ROLE } from "../services/interface";

export const MessageList = ({ messages }) => {
  return messages.length ? (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message flex items-start gap-2 p-4 rounded-lg shadow-sm ${message.role === ROLE.USER
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-white"}`}
        >
          {message.role === ROLE.USER ? (
            <div className="w-8 h-8 rounded-full bg-gray-600" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {message.role === ROLE.USER ? "You" : "AI"}
            </span>
            <div
              className="text-base"
              dangerouslySetInnerHTML={{ __html: message.message }}
            ></div>
          </div>
        </div>
      ))}
    </>
  ) : null;
};
