import React from 'react';

export function ListSkeleton() {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`animate-pulse relative overflow-hidden rounded-xl bg-gray-900 p-2 shadow-sm`}
          >
            <div className="flex p-4">
              <div className="h-5 w-5 rounded-md bg-gray-700" />
              <div className="ml-2 h-6 w-16 rounded-md bg-gray-700 text-sm font-medium" />
            </div>
            <div className="flex items-center justify-center truncate rounded-xl bg-gray-800 px-4 py-8">
              <div className="h-7 w-20 rounded-md bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }


export const SkeletonMessage = () => {
  <div className="message p-4 rounded-lg shadow-sm bg-gray-700">
    <div className="h-4 rounded-full w-full bg-gray-500 animate-pulse" />
    <div className="mt-2 flex space-x-2">
      <div className="h-4 rounded-full w-1/3 bg-gray-500 animate-pulse" />
      <div className="h-4 rounded-full w-2/3 bg-gray-500 animate-pulse" />
    </div>
  </div>
}



  
