
import React, { useState, useEffect } from 'react';
import { Question } from '../../types.ts';
import { PRACTICE_QUESTION_COUNT, PRACTICE_PASS_PERCENTAGE } from '../../constants.ts';
import { QuestionEngine } from '../../services/questionEngine.ts';
import BackButton from '../common/BackButton.tsx';
import ProgressBar from '../common/ProgressBar.tsx';

interface PracticeScreenProps {
  grade: string;
  subject: string;
  topic: string;
  level: number;
  onComplete: (completedLevel: number) => void;
  onBack: () => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ grade, subject, topic, level, onComplete, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isSessionOver, setIsSessionOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
        setIsLoading(true);
        const fetchedQuestions = await QuestionEngine.generateBatch(grade, subject, [topic], PRACTICE_QUESTION_COUNT);
        setQuestions(fetchedQuestions);
        setIsLoading(false);
    };

    fetchQuestions();
  }, [grade, subject, topic, level]);

  const handleAnswerSubmit = () => {
    if (feedback !== 'unanswered') return;

    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
      setFeedback('correct');
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setFeedback('unanswered');
      setUserAnswer('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSessionOver(true);
    }
  };
  
  const handleSessionEnd = (passed: boolean) => {
    if (passed) {
      onComplete(level);
    } else {
      onBack();
    }
  };

  if (isLoading) {
      return <div className="text-center p-10">Crafting your questions...</div>;
  }
  if (!questions || questions.length === 0) return <div className="text-center p-10">Could not load questions. Please try again.</div>;

  if (isSessionOver) {
    const score = correctAnswersCount;
    const total = questions.length;
    const percentage = total > 0 ? (score / total) : 0;
    const passed = percentage >= PRACTICE_PASS_PERCENTAGE;

    return (
      <div className="text-center p-6 sm:p-10 bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg flex flex-col items-center">
        <h2 className={`text-4xl font-bold mb-4 ${passed ? 'text-brand-green' : 'text-brand-orange'}`}>
          {passed ? 'Level Complete!' : 'Keep Practicing!'}
        </h2>
        <p className="text-lg mb-2">You scored:</p>
        <p className="text-6xl font-extrabold mb-1">{score}<span className="text-3xl text-gray-400">/{total}</span></p>
        <p className="text-2xl font-bold mb-6">{`(${(percentage * 100).toFixed(0)}%)`}</p>
        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-300">
          {passed 
            ? `Great job! You've mastered Level ${level}. The next level is now unlocked.`
            : `You need to score at least ${(PRACTICE_PASS_PERCENTAGE * 100)}% to pass. Don't give up, try again!`
          }
        </p>
        <button 
          onClick={() => handleSessionEnd(passed)}
          className="px-8 py-3 font-bold text-white bg-brand-orange rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          {passed ? 'Continue' : 'Back to Levels'}
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <BackButton onClick={onBack} text="Back to Levels"/>
      <h2 className="text-2xl font-bold mb-2">{topic} - Level {level}</h2>
      <div className="mb-4">
        <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        <p className="text-right text-sm mt-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>
      
      <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-lg shadow-lg">
        <p className="text-xl mb-6">{currentQuestion.questionText}</p>
        
        {currentQuestion.questionType === 'multiple-choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setUserAnswer(option)}
                disabled={feedback !== 'unanswered'}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  userAnswer === option
                    ? 'bg-brand-orange-light border-brand-orange dark:bg-opacity-20'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-brand-orange'
                } disabled:cursor-not-allowed`}
              >{option}</button>
            ))}
          </div>
        )}

        {currentQuestion.questionType === 'typed' && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={feedback !== 'unanswered'}
            className="w-full px-4 py-2 bg-white dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
            placeholder="Type your answer here"
          />
        )}
        
        <div className="mt-6">
          {feedback === 'unanswered' ? (
            <button onClick={handleAnswerSubmit} disabled={!userAnswer} className="w-full sm:w-auto px-6 py-3 font-bold text-white bg-brand-orange rounded-lg shadow-md enabled:hover:bg-opacity-90 disabled:bg-gray-400">Submit</button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className={`p-4 rounded-lg w-full font-semibold ${feedback === 'correct' ? 'bg-brand-green-light text-green-800' : 'bg-brand-orange-light text-red-800'}`}>
                {feedback === 'correct' ? 'Correct!' : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
              </div>
              <button onClick={handleNextQuestion} className="w-full sm:w-auto px-6 py-3 font-bold text-white bg-brand-green rounded-lg shadow-md hover:bg-opacity-90 flex-shrink-0">
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeScreen;