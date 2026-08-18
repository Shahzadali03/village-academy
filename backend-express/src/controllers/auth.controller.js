import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
  const result = await authService.register(req.body.email, req.body.password);
  res.status(201).json(result);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json(result);
};

export const changePassword = async (req, res) => {
  const result = await authService.changePassword(req.params.user_id, req.query.new_password);
  res.json(result);
};
