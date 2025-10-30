
import React, { useState } from 'react';
import { GRADES } from '../../constants';

interface LoginScreenProps {
  onLogin: (name: string, grade: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState(GRADES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), grade);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Welcome to Ideolix!</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">Let's get started. Please enter your details.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium">Grade</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-brand-dark border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-brand-orange focus:border-brand-orange rounded-md"
            >
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-transform transform hover:scale-105"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
