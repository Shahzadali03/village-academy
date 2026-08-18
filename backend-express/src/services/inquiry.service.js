import { Inquiry } from '../models/Inquiry.js';
import { CLASS_WITH_SESSION } from '../constants/populate.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

export async function getActiveInquiries() {
  const inquiries = await Inquiry.find({ isActive: true }).populate(CLASS_WITH_SESSION);
  return toApi(inquiries);
}

export async function createInquiry(data) {
  await Inquiry.create({ ...data, isActive: true });
  return { message: 'Inquiry created successfully' };
}

export async function updateInquiry(id, data) {
  const inquiry = await Inquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!inquiry) {
    throw new NotFoundError('Inquiry not found');
  }

  return { message: 'Inquiry updated successfully' };
}

export async function deleteInquiry(id) {
  const inquiry = await Inquiry.findById(id);

  if (!inquiry) {
    throw new NotFoundError('Inquiry not found');
  }

  inquiry.isActive = false;
  await inquiry.save();

  return { message: 'Inquiry deleted successfully' };
}
