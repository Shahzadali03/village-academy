import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

classSchema.virtual('session', {
  ref: 'Session',
  localField: 'session_id',
  foreignField: '_id',
  justOne: true,
});

export const ClassModel = mongoose.model('Class', classSchema);
