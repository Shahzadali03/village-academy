import * as feeService from '../services/fee.service.js';

export const getMonthlyFees = async (req, res) => {
  res.json(await feeService.getMonthlyFees(req.query.month, req.query.year));
};

export const getCurrentFees = async (req, res) => {
  res.json(await feeService.getCurrentMonthFees());
};

export const updateFee = async (req, res) => {
  res.json(await feeService.updateFee(req.params.id, req.body));
};

export const getCollection = async (req, res) => {
  res.json(await feeService.getCollectionStats(req.query.month, req.query.year));
};

export const getCollectionMonths = async (req, res) => {
  res.json(await feeService.getCollectionByMonths());
};
