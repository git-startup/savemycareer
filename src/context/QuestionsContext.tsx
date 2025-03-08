'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { questions, Question } from '../data/questions';

// Define types for the context
interface AnswersType {
  [key: number]: number;
}

interface QuestionsContextType {
  answers: AnswersType;
  updateAnswer: (questionId: number, answer: number) => void;
  nextSet: () => void;
  prevSet: () => void;
  currentSet: number;
  isLastSet: boolean;
  isFirstSet: boolean;
  getCurrentQuestions: () => Question[];
  allQuestions: Question[];
}

// Create the context with an initial undefined value
const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

interface QuestionsProviderProps {
  children: ReactNode;
}

export function QuestionsProvider({ children }: QuestionsProviderProps) {
  const [answers, setAnswers] = useState<AnswersType>({});
  const [currentSet, setCurrentSet] = useState<number>(0);

  const updateAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextSet = () => {
    if (currentSet < Math.ceil(questions.length / 4) - 1) {
      setCurrentSet(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSet = () => {
    if (currentSet > 0) {
      setCurrentSet(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const isLastSet = currentSet === Math.ceil(questions.length / 4) - 1;
  const isFirstSet = currentSet === 0;

  const getCurrentQuestions = (): Question[] => {
    const start = currentSet * 4;
    return questions.slice(start, start + 4);
  };

  return (
    <QuestionsContext.Provider
      value={{
        answers,
        updateAnswer,
        nextSet,
        prevSet,
        currentSet,
        isLastSet,
        isFirstSet,
        getCurrentQuestions,
        allQuestions: questions
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions(): QuestionsContextType {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
}