'use client';

import { useQuestions } from '../context/QuestionsContext';
import Button from './Button';
import { useRouter } from 'next/navigation';

export default function QuestionSet() {
  const router = useRouter();
  const { 
    getCurrentQuestions, 
    updateAnswer, 
    answers, 
    nextSet, 
    prevSet, 
    isLastSet, 
    isFirstSet 
  } = useQuestions();
  
  const currentQuestions = getCurrentQuestions();
  
  const handleOptionSelect = (questionId, optionIndex) => {
    updateAnswer(questionId, optionIndex);
  };
  
  const handleSubmit = () => {
    router.push('/result');
  };
  
  return (
    <div className="space-y-8 py-8">
      {currentQuestions.map(question => (
        <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`p-4 border rounded-md cursor-pointer transition-all ${
                  answers[question.id] === index 
                    ? 'border-primary bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleOptionSelect(question.id, index)}
              >
                <label className="flex items-center cursor-pointer w-full">
                  <input 
                    type="radio" 
                    name={`question-${question.id}`} 
                    checked={answers[question.id] === index}
                    onChange={() => handleOptionSelect(question.id, index)}
                    className="w-4 h-4 text-primary" 
                  />
                  <span className="ml-3">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="flex justify-between pt-4">
        {!isFirstSet && (
          <Button  onClick={prevSet} className="cursor-pointer">
            Previous Questions
          </Button>
        )} 
        {!isFirstSet && isLastSet && <div></div>}
        {!isLastSet ? (
          <Button onClick={nextSet} className="ml-auto cursor-pointer">
            Next Questions
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="secondary" className="ml-auto">
            See My Results
          </Button>
        )}
      </div>
    </div>
  );
}