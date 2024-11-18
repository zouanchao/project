import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-white">SciHelp</span>
            </div>
            <p className="text-sm">
              Empowering researchers with AI-powered writing and analysis tools.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API Reference</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">Examples</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">STAY UPDATED</h3>
            <p className="text-sm mb-4">Get the latest updates on new features and research writing tips.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 SciHelp AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-white">Privacy</a>
            <a href="#" className="text-sm hover:text-white">Terms</a>
            <a href="#" className="text-sm hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}