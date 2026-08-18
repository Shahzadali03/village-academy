export function toApi(doc) {
  if (doc == null) return doc;

  if (Array.isArray(doc)) {
    return doc.map(toApi);
  }

  const obj = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };

  if (obj._id != null) {
    obj.id = String(obj._id);
    delete obj._id;
  }

  delete obj.__v;

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value && typeof value === 'object' && value.constructor?.name === 'ObjectId') {
      obj[key] = String(value);
    }
  }

  for (const key of ['class_id', 'student_id', 'session_id']) {
    if (obj[key] != null && typeof obj[key] !== 'object') {
      obj[key] = String(obj[key]);
    }
  }

  for (const key of Object.keys(obj)) {
    if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
      obj[key] = toApi(obj[key]);
    }
  }

  return obj;
}
