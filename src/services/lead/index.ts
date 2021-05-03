import { LEAD } from '../../models';

const saveLead = async (leadDetails = {}) => new Promise((resolve, reject) => {
  const newLead = new LEAD(leadDetails);
  newLead.save()
    .then(resolve)
    .catch(reject);
});

const getLeads = async (leadDetails = {}) => new Promise((resolve, reject) => {
  LEAD.find(leadDetails)
    .then(resolve)
    .catch(reject);
});

const editLead = async (search = {}, update = {}, options = {}) => new Promise((resolve, reject) => {
  LEAD.findOneAndUpdate(search, update, options)
    .then(resolve)
    .catch(reject);
});

export { saveLead, getLeads, editLead };
