import { User } from '../models/User.js';
import { hashPassword, verifyPassword, createAccessToken } from '../utils/auth.js';
import { UnauthorizedError, NotFoundError, BadRequestError } from '../utils/ApiError.js';

export async function register(email, password) {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new BadRequestError('Email already registered');
  }

  const user = await User.create({
    email,
    password: await hashPassword(password),
  });

  const token = createAccessToken({
    user_id: String(user._id),
    email: user.email,
  });

  return {
    access_token: token,
    token_type: 'bearer',
    user: {
      id: String(user._id),
      email: user.email,
      username: user.email.split('@')[0],
    },
  };
}

export async function login(email, password) {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = createAccessToken({
    user_id: String(user._id),
    email: user.email,
  });

  return {
    access_token: token,
    token_type: 'bearer',
    user: {
      id: String(user._id),
      email: user.email,
      username: user.email.split('@')[0],
    },
  };
}

export async function changePassword(userId, newPassword) {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new NotFoundError('User not found');
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return { message: 'Password changed successfully' };
}
