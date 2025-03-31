import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeIcons } from '@fluentui/react';
import { Search } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import Confirmation from './components/Confirmation';

// Initialize FluentUI icons
initializeIcons();

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-[#002850] text-white p-4 flex justify-between items-center">
        <div className="w-32 h-8  border-2 border-white relative">
  <div className="absolute right-0 top-0 h-full w-1/4 bg-white"></div>
</div>
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" size={20} />
            <input
              type="search"
              placeholder="Search"
              className="pl-10 pr-4 py-1.5 rounded bg-white text-black w-[300px]"
            />
          </div>
          <button className="w-8 h-8 text-white hover:bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-2xl">⋮</span>
          </button>
        </header>

        <div className="max-w-4xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;