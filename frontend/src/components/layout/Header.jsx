import React from 'react';
import { Sparkles, Menu } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <GlassCard className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LogoAI</h1>
            <p className="text-xs text-white/60">Animation Tool</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-white/80 hover:text-white transition-colors">
            Services
          </a>
          <a href="#gallery" className="text-white/80 hover:text-white transition-colors">
            Gallery
          </a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors">
            About
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg glass glass-hover"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </GlassCard>
    </header>
  );
};

export default Header;
