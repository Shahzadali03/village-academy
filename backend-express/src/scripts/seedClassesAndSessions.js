import { connectDB, disconnectDB } from '../config/db.js';
import { ClassModel } from '../models/Class.js';
import { Session } from '../models/Session.js';
import { logger } from '../utils/logger.js';

const SESSIONS = ['2025-2026', '2026-2027'];
const CURRENT_SESSION = '2026-2027';

const CLASS_NAMES = [
  'KG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9 (SSC Part-I)',
  'Class 10 (SSC Part-II)',
  'Class 11 (FSc Pre-Medical)',
  'Class 12 (FSc Pre-Medical)',
  'Class 11 (FSc Pre-Engineering)',
  'Class 12 (FSc Pre-Engineering)',
];

async function seedClassesAndSessions() {
  await connectDB();

  const sessionDocs = {};

  for (const sessionName of SESSIONS) {
    let sessionDoc = await Session.findOne({ session: sessionName });

    if (!sessionDoc) {
      sessionDoc = await Session.create({ session: sessionName });
      logger.info(`Created session: ${sessionName}`);
    } else {
      logger.info(`Session already exists: ${sessionName}`);
    }

    sessionDocs[sessionName] = sessionDoc;
  }

  const currentSession = sessionDocs[CURRENT_SESSION];

  if (!currentSession) {
    throw new Error(`Current session not found: ${CURRENT_SESSION}`);
  }

  let createdClasses = 0;

  for (const name of CLASS_NAMES) {
    const existing = await ClassModel.findOne({
      name,
      session_id: currentSession._id,
    });

    if (existing) {
      logger.info(`Class already exists: ${name}`);
      continue;
    }

    await ClassModel.create({
      name,
      session_id: currentSession._id,
    });

    createdClasses += 1;
    logger.info(`Created class: ${name}`);
  }

  logger.info(
    `Seed complete — ${SESSIONS.length} sessions, ${createdClasses} new classes for ${CURRENT_SESSION}`
  );

  await disconnectDB();
  process.exit(0);
}

seedClassesAndSessions().catch(async (error) => {
  logger.error({ err: error }, 'Failed to seed classes and sessions');
  await disconnectDB();
  process.exit(1);
});
