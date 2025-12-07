import React from 'react';
import { TestTube2 } from 'lucide-react';

interface BrandingHeaderProps {
  showLogo?: boolean;
  darkMode?: boolean;
}

export default function BrandingHeader({ showLogo = true, darkMode = false }: BrandingHeaderProps) {
  return (
    <header className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} safe-area-top`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {showLogo && (
              <img
                src="/progredi-logo-white.png"
                alt="Progredi AI"
                className="h-6 sm:h-8 hidden sm:block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <TestTube2 className={`h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <div className="min-w-0">
                <h1 className={`text-lg sm:text-xl font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Core APEX
                </h1>
                <p className={`text-[10px] sm:text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Powered by Progredi AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}