import { model, Schema } from 'mongoose';

const callStatusSchema = new Schema({
  timestamp: Date,
  status: {
    type: String,
    enum: ['Called', 'Call NA', 'Not Interested', 'TBC Later'],
    required: true
  }
}, {timestamps: true});

const roundSchema = new Schema({
  title: String,
  score: Number,
  feedback: String
}, {timestamps: true});

const testSchema = new Schema({
  title: String,
  score: Number,
  status: {
    required: true,
    type: String,
    enum: ['To be Scheduled', 'Not Appeared', 'Scheduled', 'Conducted', 'Will Appear', 'Shortlisted', 'Rejected', 'Not Interested']
  }
}, {timestamps: true});

const feedbackSchema = new Schema({
  title: String,
  value: String
}, {timestamps: true});

const experienceSchema = new Schema({
  years: Number,
  months: Number
}, {_id: false});

const leadSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: [String],
    required: true
  },
  email: {
    primary: {
      type: String,
      required: true
    },
    secondary: {
      type: [String],
      default: []
    }
  },
  resumes: {
    type: [String],
    default: []
  },
  currentLocation: String,
  experience: experienceSchema,
  currentCtc: Number,
  expectedCtc: Number,
  noticePeriod: Number,
  callStatuses: {
    type: [callStatusSchema],
    default: []
  },
  rounds: {
    type: [roundSchema],
    default: []
  },
  tests: {
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
  feedbacks: {
    type: [feedbackSchema],
    default: []
  }
}, {timestamps: true});

export const LEAD = model('lead', leadSchema);
