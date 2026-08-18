import * as admissionService from '../services/admission.service.js';

export const getAdmissions = async (req, res) => {
  res.json(await admissionService.getActiveAdmissions());
};

export const createAdmission = async (req, res) => {
  res.json(await admissionService.createAdmission(req.body));
};

export const updateAdmission = async (req, res) => {
  res.json(await admissionService.updateAdmission(req.params.id, req.body));
};

export const deleteAdmission = async (req, res) => {
  res.json(await admissionService.deleteAdmission(req.params.id));
};
