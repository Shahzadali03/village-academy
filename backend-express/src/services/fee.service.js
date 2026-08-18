import { Fee } from '../models/Fee.js';
import { Student } from '../models/Student.js';
import { env } from '../config/env.js';
import { FEE_WITH_STUDENT } from '../constants/populate.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

async function ensureCurrentMonthFees(month, year) {
  const now = new Date();
  if (month !== now.getMonth() + 1 || year !== now.getFullYear()) {
    return;
  }

  const students = await Student.find({ isActive: true }).select('_id');
  if (students.length === 0) return;

  const existingFees = await Fee.find({ month, year }).select('student_id');
  const existingStudentIds = new Set(existingFees.map((fee) => String(fee.student_id)));

  const bulkOps = students
    .filter((student) => !existingStudentIds.has(String(student._id)))
    .map((student) => ({
      insertOne: {
        document: {
          student_id: student._id,
          month,
          year,
          amount: env.defaultFeeAmount,
          isPaid: false,
        },
      },
    }));

  if (bulkOps.length > 0) {
    await Fee.bulkWrite(bulkOps);
  }
}

async function getMonthlyFeeStats(month, year) {
  const [stats] = await Fee.aggregate([
    { $match: { month, year } },
    {
      $group: {
        _id: null,
        collection: {
          $sum: { $cond: [{ $eq: ['$isPaid', true] }, { $ifNull: ['$amount', 0] }, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ['$isPaid', false] }, { $ifNull: ['$amount', 0] }, 0] },
        },
        paid_count: { $sum: { $cond: [{ $eq: ['$isPaid', true] }, 1, 0] } },
        total_count: { $sum: 1 },
      },
    },
  ]);

  return {
    month,
    year,
    collection: stats?.collection || 0,
    pending: stats?.pending || 0,
    paid_count: stats?.paid_count || 0,
    total_count: stats?.total_count || 0,
  };
}

export async function getMonthlyFees(month, year) {
  await ensureCurrentMonthFees(month, year);
  const fees = await Fee.find({ month, year }).populate(FEE_WITH_STUDENT);
  return toApi(fees);
}

export async function getCurrentMonthFees() {
  const now = new Date();
  return getMonthlyFees(now.getMonth() + 1, now.getFullYear());
}

export async function updateFee(id, update = {}) {
  const fee = await Fee.findById(id);

  if (!fee) {
    throw new NotFoundError('Fee not found');
  }

  const { amount, isPaid } = update;

  if (amount != null) {
    fee.amount = amount;
  }

  if (isPaid != null) {
    fee.isPaid = isPaid;
    fee.paid_at = isPaid ? new Date() : null;
  } else if (amount == null) {
    fee.isPaid = !fee.isPaid;
    fee.paid_at = fee.isPaid ? new Date() : null;
  }

  await fee.save();

  return {
    message: 'Fee updated successfully',
    isPaid: fee.isPaid,
    amount: fee.amount,
  };
}

export async function getCollectionStats(month, year) {
  await ensureCurrentMonthFees(month, year);
  return getMonthlyFeeStats(month, year);
}

export async function getCollectionByMonths() {
  const rows = await Fee.aggregate([
    {
      $group: {
        _id: { month: '$month', year: '$year' },
        collection: {
          $sum: { $cond: [{ $eq: ['$isPaid', true] }, { $ifNull: ['$amount', 0] }, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ['$isPaid', false] }, { $ifNull: ['$amount', 0] }, 0] },
        },
        total_count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
  ]);

  const now = new Date();
  const results = [];
  const seen = new Set();

  for (const row of rows) {
    seen.add(`${row._id.month}-${row._id.year}`);
    results.push({
      month: row._id.month,
      year: row._id.year,
      collection: row.collection,
      pending: row.pending,
      total_count: row.total_count,
    });
  }

  const currentKey = `${now.getMonth() + 1}-${now.getFullYear()}`;
  if (!seen.has(currentKey)) {
    results.unshift({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      collection: 0,
      pending: 0,
      total_count: 0,
    });
  }

  return results;
}
