import * as dashboardService from '../services/dashboard.service.js';

export const getDashboardStats = async (req, res) => {
  res.json(await dashboardService.getDashboardStats());
};
