import * as classService from '../services/class.service.js';

export const getClasses = async (req, res) => {
  res.json(await classService.getClasses());
};

export const createClass = async (req, res) => {
  res.json(await classService.createClass(req.body));
};

export const updateClass = async (req, res) => {
  res.json(await classService.updateClass(req.params.id, req.body));
};

export const deleteClass = async (req, res) => {
  res.json(await classService.deleteClass(req.params.id));
};

export const getSessions = async (req, res) => {
  res.json(await classService.getSessions());
};

export const createSession = async (req, res) => {
  res.json(await classService.createSession(req.body));
};

export const updateSession = async (req, res) => {
  res.json(await classService.updateSession(req.params.id, req.body));
};

export const deleteSession = async (req, res) => {
  res.json(await classService.deleteSession(req.params.id));
};
