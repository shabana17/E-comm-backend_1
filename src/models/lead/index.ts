import { model, Schema } from 'mongoose';

const callStatusSchema = new Schema({
  timestamp: String,
  status: {
    type: String,
    enum: ['Called', 'Call NA', 'Not Interested', 'TBC Later']
  }
}, { _id: false });

const roundSchema = new Schema({
  title: String,
  score: Number,
  feedback: String
}, { _id: false });

const testSchema = new Schema({
  title: String,
  score: Number,
  status: {
    type: String,
    enum: ['To be Scheduled', 'Not Appeared', 'Scheduled', 'Conducted', 'Will Appear', 'Shortlisted', 'Rejected', 'Not Interested']
  }
}, { _id: false });

const feedbackSchema = new Schema({
  title: String,
  value: String
}, { _id: false });

const experienceSchema = new Schema({
  years: Number,
  months: Number
}, { _id: false });

const leadSchema = new Schema({

  name: String,
  mobileNumber: {
    type: [String],
    default: []
  },
  email: {
    primary: String,
    secondary: {
      type: [String],
      default: []
    }
  },
  resume: {
    type: [String],
    default: []
  },
  currentLocation: String,
  experience: experienceSchema,
  currentCtc: Number,
  expectedCtc: Number,
  noticePeriod: Number,
  callStatus: {
    type: [callStatusSchema],
    default: []
  },
  round: {
    type: [roundSchema],
    default: []
  },
  test: {
    type: [testSchema],
    default: []
  },
  finalStatus: {
    type: String,
    enum: ['Not Appeared', 'Selected', 'Rejected', 'Not Interested', 'Blacklisted']
  },
  comments: {
    type: [String],
    default: []
  },
  feedback: {
    type: [feedbackSchema],
    default: []
  }
}, { timestamps: true });

export const LEAD = model('leads', leadSchema, 'LEADS');
