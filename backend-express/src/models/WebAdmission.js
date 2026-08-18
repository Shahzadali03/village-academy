import mongoose from 'mongoose';

const webAdmissionSchema = new mongoose.Schema(
  {
    student_name: { type: String, required: true, trim: true, minlength: 2, maxlength: 255 },
    father_name: { type: String, required: true, trim: true, minlength: 2, maxlength: 255 },
    phone: { type: String, required: true, trim: true, minlength: 7, maxlength: 20 },
    email: { type: String },
    address: { type: String },
    admission_category: { type: String, enum: ['tuition', 'professional'], required: true },
    class_applying: { type: String },
    course_name: { type: String },
    preferred_batch: { type: String },
    previous_school: { type: String },
    message: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

webAdmissionSchema.index({ isActive: 1, created_at: -1 });

export const WebAdmission = mongoose.model('WebAdmission', webAdmissionSchema);
