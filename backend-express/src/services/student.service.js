import { Student } from '../models/Student.js';
import { CLASS_WITH_SESSION } from '../constants/populate.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

export async function getActiveStudents() {
  const students = await Student.find({ isActive: true }).populate(CLASS_WITH_SESSION);
  return toApi(students);
}

export async function getStudentById(id) {
  const student = await Student.findById(id).populate(CLASS_WITH_SESSION);

  if (!student) {
    throw new NotFoundError('Student not found');
  }

  return toApi(student);
}

export async function createStudent(data) {
  await Student.create(data);
  return { message: 'Student create successfully' };
}

export async function updateStudent(id, data) {
  const student = await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    throw new NotFoundError('Student not found');
  }

  return { message: 'Student updated successfully' };
}

export async function deleteStudent(id) {
  const student = await Student.findById(id);

  if (!student) {
    throw new NotFoundError('Student not found');
  }

  student.isActive = false;
  await student.save();

  return { message: 'Student deleted successfully' };
}
