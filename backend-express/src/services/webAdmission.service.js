import { WebAdmission } from '../models/WebAdmission.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

export async function createPublicApplication(data) {
  const application = await WebAdmission.create({
    ...data,
    student_name: data.student_name.trim(),
    father_name: data.father_name.trim(),
    phone: data.phone.trim(),
    isActive: true,
  });

  return {
    message: 'Admission application submitted successfully',
    id: String(application._id),
  };
}

export async function getActiveApplications() {
  const applications = await WebAdmission.find({ isActive: true }).sort({ created_at: -1 });
  return toApi(applications);
}

export async function getApplicationById(id) {
  const application = await WebAdmission.findOne({ _id: id, isActive: true });

  if (!application) {
    throw new NotFoundError('Web admission not found');
  }

  return toApi(application);
}

export async function deleteApplication(id) {
  const application = await WebAdmission.findById(id);

  if (!application) {
    throw new NotFoundError('Web admission not found');
  }

  application.isActive = false;
  await application.save();

  return { message: 'Web admission deleted successfully' };
}
