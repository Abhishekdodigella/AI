import React from 'react';
import { Brain } from 'lucide-react';
import TextGenerator from './components/TextGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Text Generator</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TextGenerator />
      </main>
    </div>
  );
}

export default App