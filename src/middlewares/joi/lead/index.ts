import joi from 'joi';
import { makeResponse } from '../../../lib';

export const createLeadValidation = (req: any, res: any, next: any) => {
  const leadSchema = joi.object({
    name: joi.string()
      .required(),
    mobileNumber: joi.array()
      .items(joi.string()
        .length(10))
      .required(),
    email: joi.object({
      primary: joi.string()
        .email()
        .required(),
      secondary: joi.array()
        .items(joi.string()
          .email())
        .default([])
    })
      .required(),
    resume: joi.array()
      .items(joi.string())
      .default([]),
    currentLocation: joi.string(),
    experience: joi.object({
      years: joi.number(),
      months: joi.number()
    }),
    currentCtc: joi.number(),
    expectedCtc: joi.number(),
    noticePeriod: joi.number(),
    callStatus: joi.array()
      .items(joi.object({
        timestamp: joi.string(),
        status: joi.string()
          .allow('Called', 'Call NA', 'Not Interested', 'TBC Later')
      })),
    round: joi.array()
      .items(joi.object({
        title: joi.string(),
        score: joi.number(),
        feedback: joi.string()
      })),
    test: joi.array()
      .items(joi.object({
        title: joi.string(),
        score: joi.number(),
        status: joi.string()
          .allow('To be Scheduled', 'Not Appeared', 'Scheduled', 'Conducted', 'Will Appear', 'Shortlisted', 'Rejected', 'Not Interested')
      })),
    finalStatus: joi.string()
      .allow('Not Appeared', 'Selected', 'Rejected', 'Not Interested', 'Blacklisted'),
    comments: joi.array()
      .items(joi.string()),
    feedback: joi.array()
      .items(joi.object({
        title: joi.string(),
        value: joi.string()
      }))
  });
  const {error} = leadSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const editLeadValidation = (req: any, res: any, next: any) => {
  const editLead = joi.object({
    lead_id: joi.string()
      .hex()
      .required(),
    callStatus: joi.array()
      .items(joi.object({
        timestamp: joi.string(),
        status: joi.string()
          .allow('Called', 'Call NA', 'Not Interested', 'TBC Later')
      })),
    round: joi.array()
      .items(joi.object({
        title: joi.string(),
        score: joi.number(),
        feedback: joi.string()
      })),
    test: joi.array()
      .items(joi.object({
        title: joi.string(),
        score: joi.number(),
        status: joi.string()
          .allow('To be Scheduled', 'Not Appeared', 'Scheduled', 'Conducted', 'Will Appear', 'Shortlisted', 'Rejected', 'Not Interested')
      })),
    finalStatus: joi.string()
      .allow('Not Appeared', 'Selected', 'Rejected', 'Not Interested', 'Blacklisted'),
    comments: joi.array()
      .items(joi.string()),
    feedback: joi.array()
      .items(joi.object({
        title: joi.string(),
        value: joi.string()
      }))
  });
  const {error} = editLead.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};
