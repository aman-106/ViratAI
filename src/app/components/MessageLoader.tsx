"use client";
import React from "react";
import { SkeletonMessage } from "./skeleton";

export const MessageLoader = ({ isLoading, multi = false }) => {
  return (
    isLoading && (
      <div className="flex space-y-4">
        {[...Array(multi ? 3 : 1)].map((_, index) => (
          <SkeletonMessage key={index} />
        ))}
      </div>
    )
  );
};
