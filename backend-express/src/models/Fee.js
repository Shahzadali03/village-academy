import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true },
    amount: { type: Number },
    isPaid: { type: Boolean, default: false },
    paid_at: { type: Date },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

feeSchema.virtual('student', {
  ref: 'Student',
  localField: 'student_id',
  foreignField: '_id',
  justOne: true,
});

feeSchema.index({ student_id: 1, month: 1, year: 1 }, { unique: true });
feeSchema.index({ month: 1, year: 1, isPaid: 1 });

export const Fee = mongoose.model('Fee', feeSchema);
