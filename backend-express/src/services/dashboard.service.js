import { ClassModel } from '../models/Class.js';
import { Student } from '../models/Student.js';
import { Admission } from '../models/Admission.js';
import { Inquiry } from '../models/Inquiry.js';
import { CLASS_WITH_SESSION, STUDENT_WITH_CLASS } from '../constants/populate.js';
import { toApi } from '../utils/transform.js';

export async function getDashboardStats() {
  const [classCount, studentCount, admissionCount, inquiryCount, recentInquiries, recentAdmissions] =
    await Promise.all([
      ClassModel.countDocuments(),
      Student.countDocuments({ isActive: true }),
      Admission.countDocuments({ isActive: true }),
      Inquiry.countDocuments({ isActive: true }),
      Inquiry.find({ isActive: true })
        .populate(CLASS_WITH_SESSION)
        .sort({ created_at: -1 })
        .limit(5),
      Admission.find({ isActive: true })
        .populate(STUDENT_WITH_CLASS)
        .sort({ _id: -1 })
        .limit(5),
    ]);

  return {
    total_students: studentCount,
    total_classes: classCount,
    total_inquiries: inquiryCount,
    total_admission: admissionCount,
    recent_inquiries: toApi(recentInquiries),
    recent_admissions: toApi(recentAdmissions),
  };
}
