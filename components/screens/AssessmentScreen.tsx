
import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../../types.ts';
import { ASSESSMENT_QUESTION_COUNT, ASSESSMENT_PASS_PERCENTAGE } from '../../constants.ts';
import { QuestionEngine } from '../../services/questionEngine.ts';
import { CURRICULUM } from '../../constants.ts';
import BackButton from '../common/BackButton.tsx';
import ProgressBar from '../common/ProgressBar.tsx';

interface AssessmentScreenProps {
  grade: string;
  subject: string;
  onPass: (score: number) => void;
  onBack: () => void;
}

const AssessmentScreen: React.FC<AssessmentScreenProps> = ({ grade, subject, onPass, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assessmentKey, setAssessmentKey] = useState(0);

  const ASSESSMENT_DURATION_SECONDS = ASSESSMENT_QUESTION_COUNT * 60;
  const [timeLeft, setTimeLeft] = useState(ASSESSMENT_DURATION_SECONDS);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    const topicsForAssessment = CURRICULUM[grade]?.[subject] || [];
    const fetchedQuestions = await QuestionEngine.generateBatch(grade, subject, topicsForAssessment, ASSESSMENT_QUESTION_COUNT);
    setQuestions(fetchedQuestions);
    setUserAnswers(Array(fetchedQuestions.length).fill(''));
    setIsLoading(false);
  }, [grade, subject]);

  useEffect(() => {
    if (grade && subject) {
      fetchQuestions();
    }
  }, [grade, subject, assessmentKey, fetchQuestions]);

  const handleSubmit = useCallback(() => {
    if (score !== null) return;
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] && userAnswers[index].trim().toLowerCase() === q.correctAnswer.toLowerCase()) {
        finalScore++;
      }
    });
    setScore(finalScore);
  }, [score, questions, userAnswers]);
  
  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleRetake = () => {
      setScore(null);
      setTimeLeft(ASSESSMENT_DURATION_SECONDS);
      setCurrentQuestionIndex(0);
      setAssessmentKey(prev => prev + 1);
  };
  
  useEffect(() => {
    if (score !== null || isLoading) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, isLoading, handleSubmit]);

  if (isLoading) {
      return <div className="text-center p-10"><h3>Building your assessment...</h3></div>;
  }
  if (!questions || questions.length === 0) return <div className="text-center p-10">Could not load assessment. Please try again.</div>;

  if (score !== null) {
    const passed = (score / ASSESSMENT_QUESTION_COUNT) >= ASSESSMENT_PASS_PERCENTAGE;
    return (
      <div className="text-center p-10 bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg">
        {passed ? (
            <>
                <h2 className="text-4xl font-bold text-brand-green mb-4">Congratulations! You Passed!</h2>
                <p className="text-2xl mb-2">Your Score:</p>
                <p className="text-6xl font-bold mb-8">{score} <span className="text-3xl text-gray-500">/ {ASSESSMENT_QUESTION_COUNT}</span></p>
                <button onClick={() => onPass(score)} className="px-8 py-4 font-bold text-white bg-brand-green rounded-lg shadow-md hover:bg-opacity-90">View Certificate</button>
            </>
        ) : (
            <>
                <h2 className="text-4xl font-bold text-brand-orange mb-4">Keep Practicing!</h2>
                <p className="text-2xl mb-2">Your Score:</p>
                <p className="text-6xl font-bold mb-4">{score} <span className="text-3xl text-gray-500">/ {ASSESSMENT_QUESTION_COUNT}</span></p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">You need to score 85% or higher to pass. Don't give up!</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={handleRetake} className="px-8 py-4 font-bold text-white bg-brand-orange rounded-lg shadow-md hover:bg-opacity-90">Retake Assessment</button>
                     <button onClick={onBack} className="px-8 py-4 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md">Back to Topics</button>
                </div>
            </>
        )}
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div>
      <BackButton onClick={onBack} text="Back to Topics"/>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-4">
        <h2 className="text-2xl font-bold">{subject} Assessment</h2>
        <div className={`text-lg font-semibold px-4 py-2 rounded-lg transition-colors ${timeLeft <= 60 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-brand-orange-light text-brand-dark'}`}>
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
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
                onClick={() => handleAnswerChange(option)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  userAnswer === option
                    ? 'bg-brand-orange-light border-brand-orange dark:bg-opacity-20'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-brand-orange'
                }`}
              >{option}</button>
            ))}
          </div>
        )}

        {currentQuestion.questionType === 'typed' && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-brand-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
            placeholder="Type your answer here"
          />
        )}
        
        <div className="mt-8 flex justify-between items-center">
          <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-6 py-2 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 rounded-lg disabled:opacity-50">Previous</button>
          {currentQuestionIndex === questions.length - 1 ? (
             <button onClick={handleSubmit} className="px-6 py-3 font-bold text-white bg-brand-green rounded-lg shadow-md hover:bg-opacity-90">Finish Assessment</button>
          ) : (
            <button onClick={handleNext} className="px-6 py-2 font-semibold text-white bg-brand-orange rounded-lg">Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentScreen;