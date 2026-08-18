import { connectDB, disconnectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { hashPassword } from '../utils/auth.js';
import { logger } from '../utils/logger.js';

async function createAdmin() {
  await connectDB();

  const existing = await User.findOne({ email: env.adminEmail });

  if (existing) {
    logger.info(`Admin user already exists: ${env.adminEmail}`);
    await disconnectDB();
    process.exit(0);
  }

  await User.create({
    email: env.adminEmail,
    password: await hashPassword(env.adminPassword),
  });

  logger.info(`Admin user created: ${env.adminEmail}`);
  await disconnectDB();
  process.exit(0);
}

createAdmin().catch(async (error) => {
  logger.error({ err: error }, 'Failed to create admin');
  await disconnectDB();
  process.exit(1);
});
