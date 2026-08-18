import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function createAccessToken(payload) {
  return jwt.sign(payload, env.secretKey, {
    algorithm: env.jwtAlgorithm,
    expiresIn: `${env.accessTokenExpireMinutes}m`,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.secretKey, { algorithms: [env.jwtAlgorithm] });
}
