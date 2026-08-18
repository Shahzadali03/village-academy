import { ClassModel } from '../models/Class.js';
import { Session } from '../models/Session.js';
import { toApi } from '../utils/transform.js';
import { NotFoundError } from '../utils/ApiError.js';

export async function getClasses() {
  const classes = await ClassModel.find().populate('session');
  return {
    classes: toApi(classes),
    message: 'Classes Retrive Successfully',
  };
}

export async function createClass(data) {
  await ClassModel.create(data);
  return { message: 'Class Add Successfully' };
}

export async function updateClass(id, data) {
  const classDoc = await ClassModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!classDoc) {
    throw new NotFoundError('Class not found');
  }

  return { message: 'Class Update Successfully' };
}

export async function deleteClass(id) {
  const classDoc = await ClassModel.findByIdAndDelete(id);

  if (!classDoc) {
    throw new NotFoundError('Class not found');
  }

  return { message: 'Class delete successfully' };
}

export async function getSessions() {
  const sessions = await Session.find();
  return {
    session: toApi(sessions),
    message: 'Session Retrive Successfuly',
  };
}

export async function createSession(data) {
  await Session.create(data);
  return { message: 'Session Create Successfully' };
}

export async function updateSession(id, data) {
  const sessionDoc = await Session.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!sessionDoc) {
    throw new NotFoundError('Session not found');
  }

  return { message: 'Session Update Successfully' };
}

export async function deleteSession(id) {
  const sessionDoc = await Session.findByIdAndDelete(id);

  if (!sessionDoc) {
    throw new NotFoundError('Session not found');
  }

  return { message: 'Session delete successfully' };
}
