import * as webAdmissionService from '../services/webAdmission.service.js';

export const createPublicApplication = async (req, res) => {
  res.json(await webAdmissionService.createPublicApplication(req.body));
};

export const getApplications = async (req, res) => {
  res.json(await webAdmissionService.getActiveApplications());
};

export const getApplication = async (req, res) => {
  res.json(await webAdmissionService.getApplicationById(req.params.application_id));
};

export const deleteApplication = async (req, res) => {
  res.json(await webAdmissionService.deleteApplication(req.params.application_id));
};
