
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'My Notes', path: '/notes' },
    { name: 'Wallpaper', path: '/wallpaper' },
  ];

  return (
    <header className="w-full pt-6 pb-4 sticky top-0 z-10 glass-card">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <span className="font-display text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              NoteWall
            </span>
          </motion.div>
        </Link>

        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative px-3 py-2 text-sm rounded-full transition-all duration-300",
                isActive(item.path)
                  ? "text-primary font-medium"
                  : "text-ink-light hover:text-primary"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  initial={false}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
