import React from 'react';

export default function BrandingFooter() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/progredi-logo-white.png"
                alt="Progredi AI"
                className="h-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-lg font-bold">Progredi AI</h3>
                <p className="text-xs text-gray-400">Advancing through AI</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Transforming defense and government operations with cutting-edge AI solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://coreapex.progrediai.com" className="text-gray-400 hover:text-white transition">
                  Core APEX
                </a>
              </li>
              <li>
                <a href="https://corevault.progrediai.com" className="text-gray-400 hover:text-white transition">
                  Core Vault
                </a>
              </li>
              <li>
                <a href="https://core.progrediai.com" className="text-gray-400 hover:text-white transition">
                  Core Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://progrediai.com" className="text-gray-400 hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="mailto:sales@progrediai.com" className="text-gray-400 hover:text-white transition">
                  Contact Sales
                </a>
              </li>
              <li>
                <span className="text-gray-400">CAGE: 10X15</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-300">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>sales@progrediai.com</li>
              <li>support@progrediai.com</li>
              <li>Washington, DC</li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              🇺🇸 Proudly engineered in the USA
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Progredi Systems, LLC. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <a href="https://progrediai.com/privacy" className="text-gray-500 hover:text-gray-300 transition">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="https://progrediai.com/terms" className="text-gray-500 hover:text-gray-300 transition">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="https://progrediai.com/cookies" className="text-gray-500 hover:text-gray-300 transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}