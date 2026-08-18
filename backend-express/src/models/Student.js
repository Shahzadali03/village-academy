import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    father_name: { type: String, required: true, trim: true },
    age: { type: Number, min: 5, max: 100 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    phone_number: { type: String, required: true, maxlength: 11 },
    address: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

studentSchema.virtual('classes', {
  ref: 'Class',
  localField: 'class_id',
  foreignField: '_id',
  justOne: true,
});

studentSchema.index({ isActive: 1 });
studentSchema.index({ class_id: 1 });

export const Student = mongoose.model('Student', studentSchema);
