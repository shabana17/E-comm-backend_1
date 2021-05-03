import { Router } from 'express';
import { makeResponse } from '../../lib';
import { createLeadValidation, editLeadValidation } from '../../middlewares';
import { editLead, getLeads, saveLead } from '../../services';

const router = Router();

router.post('/create',
  createLeadValidation, (req, res) => {
    saveLead(req.body)
      .then(async lead => {
        return makeResponse(res, 200, true, 'Lead saved successfully', lead);
      })
      .catch(async error => {
        return makeResponse(res, 400, false, error.message, undefined);
      });
  });

router.get('/list', async (req, res) => {
  try {
    const leads = await getLeads({});
    await makeResponse(res, 200, true, '', leads);
  } catch (error) {
    await makeResponse(res, 400, false, error.message);
  }
});

router.put('/edit',
  editLeadValidation, async (req, res) => {
    try {
      const editedLead = await editLead({_id: req.body.lead_id}, req.body, {new: true});
      await makeResponse(res, 200, true, 'Edit successful', editedLead);
    } catch (error) {
      await makeResponse(res, 400, false, error.message);
    }
  });

export const leadController = router;
