// src/models/UserSubscription.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define interface for user info from assessment
interface UserInfo {
  career: string;
  location: string;
  experience: string;
}

// Define interface for assessment results
interface AssessmentResults {
  riskLevelKey: 'high_risk' | 'moderate_risk' | 'low_risk';
  percentage: number;
  userInfo: UserInfo;
  answers: Record<number, number>;
}

// Define interface for subscriber document
export interface IUserSubscription extends Document {
  name: string;
  email: string;
  subscriptionDate: Date;
  lastEmailSent?: Date;
  unsubscribed: boolean;
  assessmentResults: AssessmentResults;
}

// Define schema
const UserSubscriptionSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscriptionDate: { 
    type: Date, 
    default: Date.now 
  },
  lastEmailSent: { 
    type: Date,
    default: null
  },
  unsubscribed: { 
    type: Boolean,
    default: false
  },
  assessmentResults: {
    riskLevelKey: {
      type: String,
      enum: ['high_risk', 'moderate_risk', 'low_risk'],
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    userInfo: {
      career: String,
      location: String,
      experience: String
    },
    answers: {
      type: Map,
      of: Number
    }
  }
});

// Create or get the model
export const UserSubscription = mongoose.models.UserSubscription || 
  mongoose.model<IUserSubscription>('UserSubscription', UserSubscriptionSchema);