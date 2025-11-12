
import React from 'react';

const App: React.FC = () => {
  if (!import.meta.env.VITE_API_KEY) {
    return (
      <div className="min-h-screen bg-brand-primary p-4 sm:p-8 flex items-center justify-center">
        <div className="bg-red-800/20 border border-red-500 text-red-300 p-8 rounded-lg max-w-lg text-center shadow-2xl">
          <h1 className="text-3xl font-bold mb-4">Configuration Error</h1>
          <p className="text-lg mb-4">The application is missing the required API key for fetching data.</p>
          <p className="text-md">Please refer to the <code>README.md</code> file for instructions on how to set up your <code>.env</code> file with a valid <code>VITE_API_KEY</code>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary p-4 sm:p-8">
      <div className="container mx-auto max-w-5xl bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <header className="p-6 border-b border-gray-700 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            <span className="text-brand-accent">La Liga</span> Stats AI
          </h1>
          <p className="text-brand-text-secondary mt-2">Real-time, AI-powered statistics for the Spanish league</p>
        </header>
      </div>
    </div>
  );
};

export default App;
