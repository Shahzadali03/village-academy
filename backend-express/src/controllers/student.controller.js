import * as studentService from '../services/student.service.js';

export const getStudents = async (req, res) => {
  res.json(await studentService.getActiveStudents());
};

export const getStudent = async (req, res) => {
  res.json(await studentService.getStudentById(req.params.id));
};

export const createStudent = async (req, res) => {
  res.json(await studentService.createStudent(req.body));
};

export const updateStudent = async (req, res) => {
  res.json(await studentService.updateStudent(req.params.id, req.body));
};

export const deleteStudent = async (req, res) => {
  res.json(await studentService.deleteStudent(req.params.id));
};
