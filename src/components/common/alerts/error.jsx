import React, { useState, useEffect } from "react";

const ErrorAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the message after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    // Clear the timer when the component unmounts or when isVisible changes
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center h-screen">
      <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center w-12 bg-red-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>

        <div className="px-4 py-2 -mx-3">
          <div className="mx-3">
            <span className="font-semibold text-red-500">Error</span>
            <p className="text-sm text-gray-600">Your email is already used!</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ErrorAlert;
