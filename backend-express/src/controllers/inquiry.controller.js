import * as inquiryService from '../services/inquiry.service.js';

export const getInquiries = async (req, res) => {
  res.json(await inquiryService.getActiveInquiries());
};

export const createInquiry = async (req, res) => {
  res.json(await inquiryService.createInquiry(req.body));
};

export const updateInquiry = async (req, res) => {
  res.json(await inquiryService.updateInquiry(req.params.id, req.body));
};

export const deleteInquiry = async (req, res) => {
  res.json(await inquiryService.deleteInquiry(req.params.id));
};
