import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    admission_date: { type: Date, required: true },
    previous_school: { type: String },
    guardian_name: { type: String, required: true, trim: true },
    guardian_number: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

admissionSchema.virtual('student', {
  ref: 'Student',
  localField: 'student_id',
  foreignField: '_id',
  justOne: true,
});

admissionSchema.index({ isActive: 1 });
admissionSchema.index({ student_id: 1 });

export const Admission = mongoose.model('Admission', admissionSchema);
