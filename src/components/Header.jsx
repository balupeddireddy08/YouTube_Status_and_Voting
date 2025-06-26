import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['About', 'Skills', 'Projects', 'Certifications', 'Articles', 'YouTube', 'Contact'];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.a 
            href="#" 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            whileHover={{ scale: 1.05 }}
          >
            BALA GOPAL REDDY PEDDIDERDY
          </motion.a>

          <div className="flex items-center space-x-6">
            {/* Theme toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 dark:text-white focus:outline-none transition-colors duration-300"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <motion.li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <motion.nav 
            className="md:hidden py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
              <motion.li className="pt-4">
                <ThemeToggle />
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 