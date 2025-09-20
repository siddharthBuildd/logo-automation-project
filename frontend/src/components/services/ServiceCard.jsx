import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  features = [], 
  onClick,
  className = '' 
}) => {
  return (
    <GlassCard 
      className={`group ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {/* Icon and Title */}
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 mr-4">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        
        {/* Description */}
        <p className="text-white/80 mb-6 flex-grow">
          {description}
        </p>
        
        {/* Features */}
        {features.length > 0 && (
          <div className="mb-6">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-white/70">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-white/60 text-sm">Get started</span>
          <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </GlassCard>
  );
};

export default ServiceCard;
