import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    father_name: { type: String, required: true, trim: true },
    age: { type: Number },
    gender: { type: String },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    phone_number: { type: String, required: true, maxlength: 11 },
    address: { type: String },
    source: { type: String, required: true, trim: true },
    previous_school: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

inquirySchema.virtual('classes', {
  ref: 'Class',
  localField: 'class_id',
  foreignField: '_id',
  justOne: true,
});

inquirySchema.index({ isActive: 1, created_at: -1 });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
