"use client"
import { useState } from 'react';
import InputForm from './component/inputFormTrf';
import StrukLainLain from './component/inputFormLain'; // Import komponen lain

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<'transfer' | 'lain'>('transfer');

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 mt-6">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveComponent('transfer')}
          className={`px-6 py-3 rounded-md font-semibold text-white ${
            activeComponent === 'transfer' ? 'bg-indigo-600' : 'bg-gray-400'
          } hover:bg-indigo-500 transition`}
        >
          Struk Transfer
        </button>

        <button
          onClick={() => setActiveComponent('lain')}
          className={`px-6 py-3 rounded-md font-semibold text-white ${
            activeComponent === 'lain' ? 'bg-indigo-600' : 'bg-gray-400'
          } hover:bg-indigo-500 transition`}
        >
          Struk Lain Lain
        </button>
      </div>

      {/* Menampilkan komponen berdasarkan state */}
      <div className="w-full max-w-lg">
        {activeComponent === 'transfer' ? <InputForm /> : <StrukLainLain />}
      </div>
    </div>
  );
}
