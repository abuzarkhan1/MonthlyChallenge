import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
          <div className="mb-4 md:mb-0">
            <span className="text-blue-400 font-bold text-lg">MonthChallenge</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-6 items-center text-sm">
            <a href="/privacy" className="mb-2 md:mb-0 hover:text-blue-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="mb-2 md:mb-0 hover:text-blue-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-blue-400 transition-colors duration-200">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} All rights reserved to Abuzar Khan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;