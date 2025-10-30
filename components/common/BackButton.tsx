
import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text = "Back" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-brand-orange hover:underline mb-6 text-sm font-semibold"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {text}
    </button>
  );
};

export default BackButton;
