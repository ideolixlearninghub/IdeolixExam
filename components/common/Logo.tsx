
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="https://raw.githubusercontent.com/ideolixlearninghub/ideolix-web/main/ideolix%20LOGO.jpg" 
        alt="Ideolix Logo" 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/50"
      />
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark dark:text-brand-light">
        Ideolix
      </h1>
    </div>
  );
};

export default Logo;
