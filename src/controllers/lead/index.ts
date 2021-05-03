import { Router } from 'express';
import { makeResponse } from '../../lib';
import { createLeadValidation, editLeadValidation } from '../../middlewares';
import {
  editLead, getLeads,
  saveLead
} from '../../services';

const router = Router();

router.post('/create',
  createLeadValidation, async (req, res) => {
    try {
      const lead = await saveLead(req.body);

      return makeResponse(res, 200, true, 'Lead saved successfully', lead);
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  });

router.get('/list', async (req, res) => {
  try {
    const leads = await getLeads({});
    await makeResponse(res, 200, true, '', leads);
  } catch (error) {
    await makeResponse(res, 500, false, error.message);
  }
});

router.put('/edit',
  editLeadValidation, async (req, res) => {
    try {
      const editedLead = await editLead({ _id: req.body.lead_id }, req.body, { new: true });
      await makeResponse(res, 200, true, 'Edit successful', editedLead);
    } catch (error) {
      await makeResponse(res, 500, false, error.message);
    }
  });

export const leadRouter = router;
