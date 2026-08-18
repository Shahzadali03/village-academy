import { Admission } from '../models/Admission.js';
import { Student } from '../models/Student.js';
import { STUDENT_WITH_CLASS } from '../constants/populate.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

export async function getActiveAdmissions() {
  const admissions = await Admission.find({ isActive: true }).populate(STUDENT_WITH_CLASS);
  return toApi(admissions);
}

export async function createAdmission(data) {
  const student = await Student.create(data.student);

  try {
    await Admission.create({
      student_id: student._id,
      admission_date: data.admission_date,
      previous_school: data.previous_school,
      guardian_name: data.guardian_name,
      guardian_number: data.guardian_number,
    });
  } catch (error) {
    await Student.findByIdAndDelete(student._id);
    throw error;
  }

  return { message: 'Admission created successfully' };
}

export async function updateAdmission(id, data) {
  const studentResult = await Student.findByIdAndUpdate(id, data.student, {
    new: true,
    runValidators: true,
  });

  if (!studentResult) {
    throw new NotFoundError('Student not found');
  }

  const admissionResult = await Admission.findByIdAndUpdate(
    id,
    {
      student_id: studentResult._id,
      admission_date: data.admission_date,
      previous_school: data.previous_school,
      guardian_name: data.guardian_name,
      guardian_number: data.guardian_number,
    },
    { new: true, runValidators: true }
  );

  if (!admissionResult) {
    throw new NotFoundError('Admission not found');
  }

  return { message: 'Admission updated successfully' };
}

export async function deleteAdmission(id) {
  const admission = await Admission.findById(id);

  if (!admission) {
    throw new NotFoundError('Admission not found');
  }

  admission.isActive = false;
  await admission.save();

  if (admission.student_id) {
    await Student.findByIdAndUpdate(admission.student_id, { isActive: false });
  }

  return { message: 'Admission deleted successfully' };
}
