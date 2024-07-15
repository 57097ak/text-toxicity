// src/TestComponent.js
import React from 'react';

function TestComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>
      <p className="mt-4 text-gray-700">If you see this, Tailwind is working!</p>
      <button className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition">
        Click Me
      </button>
    </div>
  );
}

export default TestComponent;
