// utils/analyzeResponses.ts

// Define types for clarity and type safety
type AnswerMap = Record<number, number>;

// Updated interface to use translation keys
interface RiskAssessment {
  riskLevelKey: 'high_risk' | 'moderate_risk' | 'low_risk'; // Translation keys instead of hardcoded values
  percentage: number;
  messageKey: string; // Using translation key
  tipKeys: string[]; // Array of translation keys for tips
}

type RiskMapping = Record<number, number[]>;

export const analyzeResponses = (answers: AnswerMap): RiskAssessment => {
  // Map answer indices to risk scores (0-3, where 3 is highest risk of AI replacement)
  const riskMapping: RiskMapping = {
    1: [3, 2, 1, 0], // Repetitive tasks (more repetition = higher risk)
    2: [3, 2, 1, 0], // Creative thinking (less creativity = higher risk)
    3: [3, 2, 1, 0], // Complex decision making (less complexity = higher risk)
    4: [3, 2, 1, 0], // Adaptability (less adaptability = higher risk)
    5: [3, 2, 1, 0], // Human relationships (fewer relationships = higher risk)
    6: [3, 2, 1, 0], // Specialized knowledge (less specialized = higher risk)
    7: [3, 2, 1, 0], // Physical tasks (fewer physical tasks = higher risk)
    8: [3, 2, 1, 0], // Emotional intelligence (less EQ = higher risk)
    9: [3, 2, 1, 0], // Rule-based work (more rule-based = higher risk)
    10: [0, 1, 2, 3], // Data analysis (more data analysis = mixed risk, could be either way)
    11: [0, 1, 2, 3], // Field changing with tech (faster change = higher risk)
    12: [3, 2, 1, 0]  // Tech comfort (less comfort = higher risk)
  };

  // Calculate risk score
  let totalScore = 0;
  let answeredQuestions = 0;

  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    totalScore += riskMapping[qId][answerIndex];
    answeredQuestions++;
  });

  // If no questions answered, return default
  if (answeredQuestions === 0) {
    return {
      riskLevelKey: "moderate_risk", // Default to moderate risk as key
      percentage: 50,
      messageKey: "no_answers", // Translation key for message
      tipKeys: ["try_answering"] // Translation keys for tips
    };
  }

  // Calculate percentage (higher score = higher risk)
  const maxPossibleScore = answeredQuestions * 3;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Determine risk level and provide translation keys for tips
  if (percentage >= 75) {
    return {
      riskLevelKey: "high_risk",
      percentage,
      messageKey: "high_risk_message",
      tipKeys: [
        "high_risk_tip_1",
        "high_risk_tip_2",
        "high_risk_tip_3",
        "high_risk_tip_4",
        "high_risk_tip_5"
      ]
    };
  } else if (percentage >= 40) {
    return {
      riskLevelKey: "moderate_risk",
      percentage,
      messageKey: "moderate_risk_message",
      tipKeys: [
        "moderate_risk_tip_1",
        "moderate_risk_tip_2",
        "moderate_risk_tip_3",
        "moderate_risk_tip_4",
        "moderate_risk_tip_5"
      ]
    };
  } else {
    return {
      riskLevelKey: "low_risk",
      percentage,
      messageKey: "low_risk_message",
      tipKeys: [
        "low_risk_tip_1",
        "low_risk_tip_2",
        "low_risk_tip_3",
        "low_risk_tip_4",
        "low_risk_tip_5"
      ]
    };
  }
};